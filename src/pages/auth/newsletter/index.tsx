import { Button, NewTable, PageTitle, SidePanel } from "@/components";
import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { addNewsletter, updateNewsLetter } from "@/api/newsletter";
import NewLetterForm from "./newLetterForm";
import { PencilIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { checkSubset } from "@/utils";
import { useAuth } from "../../../../hooks/auth";
import Search from "@/components/search";
import { deleteById, getQuery, getQueryData } from "@/api";
import { APP_NAME } from "@/constants";
import Head from "next/head";

const initialState = {
    name: "",
    content: ""
};
export default function Newsletter() {
    const { role, isAuthenticated } = useAuth()
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])
    const [page, setPage] = useState<number>(1);
    const [packageId, setPackageId] = useState<number>(0)
    const columnHelper = createColumnHelper<any>();
    const [isVisible, toggleIsVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>(initialState)
    const [edit, setEdit] = useState(false)

    const { isLoading, data, refetch, isFetching } = useQuery(
        ["newsletter", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (res: any) => {
            setTableData(res.data);
        },
        enabled: isAuthenticated
    })

    useQuery(['newsletter', packageId], getQuery, {
        onSuccess: (data: any) => {
            setState({ name: data.name, id: data.id, content: data.content })
            setPackageId(0)
        },
        enabled: packageId ? true : false
    })
    const { isLoading: creatingPackage, mutate } = useMutation<any, Error>(addNewsletter,
        {
            onSuccess: () => {
                refetch();
                toggleIsVisible(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );
    const { mutate: update, isLoading: updating } = useMutation<any, Error>(updateNewsLetter,
        {
            onSuccess: () => {
                refetch();
                toggleIsVisible(false);
            },
            onError: (err: any) => {
                const { status, data } = err.response;
                if (status == 422) {
                    setFormErrors(data);
                } else {
                    console.log("Course Form Error: ", err);
                }
            },
        }
    );

    const { mutate: deleteNewsletter } = useMutation(deleteById, {
        onSuccess: () => refetch()
    })

    const handleClick = (id: number) => {
        setPackageId(id)
        setEdit(true)
        toggleIsVisible(!isVisible)
    }
    const columns = [
        columnHelper.accessor((row: any) => row, {
            id: "name",
            cell: ({ row }) => row.original.name,
            header: "Newsletter Name/Subject",
        }),
        columnHelper.accessor((row: any) => row.created_at, {
            id: "created_at",
            cell: (info) => info.getValue(),
            header: "Created At",
        }),
        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id } = info?.row.original
                return (
                    <div className='flex items-center space-x-2'>
                        <Button
                            label=''
                            buttonType="success"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                            tooltipMsg="Edit Newsletter"
                        />
                        {
                            <Button
                                label=''
                                buttonType="danger"
                                icon={<TrashIcon className="w-5" />}
                                onClick={() => deleteNewsletter({ name: "newsletter", id })}
                                tooltipMsg="Delete Newsletter"
                            />
                        }
                    </div>
                );
            },
            enableSorting: false
        }),
    ];


    const handleSearch = (value: any) => {
        setPage(1)
        setQuery(value)
    }

    const handlePaginationActon = (currentPage: any | void) => {
        setPage(currentPage.selected + 1)
    }

    return (
        <>
            <Head>
                <title>{APP_NAME} | Newsletter</title>
            </Head>
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Send NewsLetter' />
                <Button
                    label='Add Newsletter'
                    buttonType="success"
                    onClick={() => {
                        toggleIsVisible(true);
                        setState(initialState);
                        setEdit(false)
                    }}
                />
            </div>
            <div className='flex flex-col sm:px-6 lg:px-8'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full '>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <Search query={query} placeholder="Search newsletter" handleSearch={handleSearch} />
                            <div className="">
                                <NewTable
                                    data={tableData}
                                    columns={columns}
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    pageCount={data?.last_page}
                                    Page={page}
                                    handlePaginationActon={handlePaginationActon}
                                    isloading={isFetching}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SidePanel
                isVisible={isVisible}
                onClose={() => {
                    toggleIsVisible(!isVisible);
                    setFormErrors({});
                }}
                wide="3xl"
                title={edit ? 'Edit Newsletter' : 'Add Newsletter'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    state?.id ? update(state) :
                        mutate(state)
                }}
                primaryButtonLoading={creatingPackage || updating}
            >
                <React.Suspense fallback='loading'>
                    <NewLetterForm state={state} setState={setState} error={formerrors} />
                </React.Suspense>
            </SidePanel>
        </>
    )
}
