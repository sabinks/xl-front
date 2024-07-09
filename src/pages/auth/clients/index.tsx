import { Button, CheckBox, NewTable, PageTitle, SidePanel } from "@/components";
import { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getQuery, deleteById, getQueryData, addClient, userStatusChange } from "@/api";
import Search from "@/components/search";
import ClientForm from "./clientForm";
import { DocumentIcon, ListBulletIcon, PencilSquareIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useAuth } from "../../../../hooks/auth";
import { format } from "date-fns";
import Head from "next/head";
import { APP_NAME } from "@/constants";
import Modal from "@/components/modal";

const initialState = { is_active: false, data: { mobile: '' } };
export default function Client() {
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'created_at',
        desc: true
    }])
    const [page, setPage] = useState<number>(1);
    const [packageId, setPackageId] = useState<number>(0)
    const columnHelper = createColumnHelper<any>();
    const [isVisible, setSidePanelShow] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [state, setState] = useState<any>(initialState)
    const [edit, setEdit] = useState(false)
    const [lastPage, setLastPage] = useState(1)
    const { role, isAuthenticated } = useAuth()

    const { isFetching, data, refetch } = useQuery(
        ["clients", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (res) => {
            // setLastPage(res.data.last_page)
            setTableData(res.data.data);
        },
        enabled: isAuthenticated
    })

    useQuery(['clients', packageId], getQuery, {
        onSuccess: (res) => {
            const { data, image_path } = res
            setState({
                ...data,
                data: (data.data == "0" || data.data == "undefined" || data.data == "false" || data.data == null || data.data == "")
                    ? { mobile: '' } : JSON.parse(data?.data),
                profile_image: '',
                image: data.profile_image,
                image_path: `${image_path}${data.profile_image}`,

            })
            setPackageId(0)
        },
        enabled: packageId ? true : false
    })
    const { isLoading: creatingClient, mutate } = useMutation<any, Error>(addClient,
        {
            onSuccess: (res) => {
                refetch();
                setSidePanelShow(false);
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

    const { mutate: deletePackage } = useMutation(deleteById, {
        onSuccess: () => {
            refetch()
        }
    })
    const { mutate: mutateUserStatusChange }: any = useMutation<any>(userStatusChange,
        {
            onSuccess: (res, variables: any) => {
                const { id, status } = variables
                const newData = tableData.map((client: any) => {
                    if (client.id == id) {
                        return { ...client, is_active: status }
                    } return client
                })
                setTableData(newData)
            }
        }
    );

    const handleClick = (id: number) => {
        setEdit(true)
        setPackageId(id)
        setSidePanelShow(!isVisible)
    }

    const handleUserStatusChange = (e: any, id: number) => {
        const { checked } = e.target
        mutateUserStatusChange({ id, status: checked })
    }
    let columns = [
        columnHelper.accessor((row: any) => row.name, {
            id: "name",
            cell: (info) => info.getValue(),
            header: "Client Name",
        }),
        columnHelper.accessor((row: any) => row.email, {
            id: "email",
            cell: (info) => info.getValue(),
            header: "Email",
        }),
        columnHelper.accessor((row: any) => row.phone, {
            id: "phone",
            cell: (info) => info.getValue(),
            header: "Phone",
        }),
        columnHelper.accessor((row: any) => row.dob, {
            id: "dob",
            cell: (info) => <span>{info.getValue() ? format(new Date(info.row.original?.dob), 'd/M/Y') : ''}</span>,
            header: "dob",
        }),

        // columnHelper.accessor((row: any) => row.partner_created, {
        //     id: "client_partners",
        //     cell: (info) => info?.getValue().length > 0 ? `${info?.getValue()[0]?.name} (${info?.getValue()[0]?.email})` : "Self Sign Up",
        //     header: "Partner Created",
        // }),
        columnHelper.accessor((row: any) => row.is_active, {
            id: "is_active",
            cell: (info: any) => <span>
                <CheckBox name="is_active" label="" checked={info.getValue()} onChange={(e: any) => handleUserStatusChange(e, info?.row?.original?.id)} />
            </span>,
            header: "Status",
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
                        <Link href={`/auth/clients/${id}/profile`}>
                            <Button
                                label=''
                                buttonType="primary"
                                icon={<UserIcon className="w-5 h-5" />}
                                tooltipMsg="Client Note"
                            />
                        </Link>
                        <Button
                            label=''
                            buttonType="success"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                            tooltipMsg="Edit Client"
                        />
                        {/* {
                            <Button
                                label=''
                                buttonType="danger"
                                icon={<TrashIcon className="w-5" />}
                                onClick={() => deletePackage({ name: "client", id })}
                                tooltipMsg="Delete Client"
                            />
                        } */}
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
                <title>{APP_NAME} | Clients</title>
            </Head>
            <div className='flex flex-row justify-between items-center'>
                <PageTitle title='Clients' />
                <Button
                    label='Add Client'
                    buttonType="success"
                    onClick={() => {
                        setEdit(false)
                        setSidePanelShow(true);
                        setState(initialState);
                    }}
                />
            </div>
            <Search query={query} placeholder="Search client" handleSearch={handleSearch} />
            <div className='flex flex-col sm:px-6 lg:px-8'>
                <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='py-2 align-middle inline-block min-w-full '>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>

                            <div className="">
                                <NewTable
                                    data={tableData}
                                    columns={columns}
                                    sorting={sorting}
                                    setSorting={setSorting}
                                    pageCount={data?.data?.last_page}
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
                    setSidePanelShow(!isVisible);
                    setFormErrors({});
                }}
                title={edit ? 'Edit Client' : 'Add Client'}
                primaryButtonAction={() => {
                    setFormErrors({});
                    mutate(state)
                }}
                primaryButtonLoading={creatingClient}
            >
                <React.Suspense fallback='loading'>
                    <ClientForm state={state} setState={setState} error={formerrors} edit={edit} />
                </React.Suspense>
            </SidePanel>
        </>
    )
}
