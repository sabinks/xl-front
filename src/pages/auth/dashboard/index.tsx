import React, { useState } from "react";
import { createColumnHelper, SortingState } from "@tanstack/react-table";
import { useMutation, useQuery } from "@tanstack/react-query";
import { EyeIcon, PaperClipIcon, PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { checkSubset } from "@/utils";
import { appointmentStatusChange, deleteAppointment, getQueryData, paymentForBookAppointment, showAppointment, updateAppointment } from "../../../api";
import { CheckBox, NewTable, PageTitle, SidePanel, Button } from "../../../components";
import Search from "../../../components/search";
import { useAuth } from "../../../../hooks/auth";
import Select from 'react-select'
import Head from "next/head";
import { APP_NAME } from "@/constants";
import Modal from "@/components/modal";
import BookingAppointmentForm from "./bookingAppointmentForm";
import { format } from "date-fns";
import { FaDollarSign } from "react-icons/fa";

const list = [
    { label: "Tentative", value: "Tentative" },
    { label: "Confirmed", value: "Confirmed" },
    { label: "Cancelled", value: "Cancelled" },
]
export default function Dashboard() {
    const { role, user: { email }, isAuthenticated } = useAuth()
    const [query, setQuery] = useState<string>("");
    const [sorting, setSorting] = useState<SortingState>([{
        id: 'createdAt',
        desc: true
    }])
    const [page, setPage] = useState<number>(1);
    const [bookingAppointmentId, setBookingAppointmentId] = useState<number>(0)
    const columnHelper = createColumnHelper<any>();
    const [isVisible, setEditModalVisible] = React.useState(false);
    const [tableData, setTableData] = React.useState<any>([]);
    const [bookAppointment, setBookAppointment] = useState<any>({})
    const [showBookAppointement, setShowBookAppointment] = useState<boolean>(false)
    const [formerrors, setFormErrors] = React.useState<any>({});
    const [edit, setEdit] = useState(false)

    const { isLoading, data, refetch, isFetching } = useQuery(
        ["book-appointments", query, sorting[0].id, sorting[0].desc ? 'desc' : 'asc', page, 10],
        getQueryData, {
        onSuccess: (res) => {
            setTableData(res.data);
        },
        enabled: isAuthenticated ? true : false
    })

    useQuery(['booking-appointments', bookingAppointmentId], showAppointment, {
        onSuccess: (data) => {
            setBookAppointment(data)
            setBookingAppointmentId(0)
        },
        enabled: bookingAppointmentId ? true : false
    })
    const { mutate: mutateBookAppointment, isLoading: updatingBookingAppointment } = useMutation<any, Error>(updateAppointment,
        {
            onSuccess: () => {
                refetch()
                setEditModalVisible(false)
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
    const { mutate: mutateClickSendPayment } = useMutation(paymentForBookAppointment, {
        onSuccess: () => refetch()
    })

    const handleClick = (id: number) => {
        setBookingAppointmentId(id)
        setEdit(true)
        setEditModalVisible(true)
    }
    const handleClickSendPayment = (id: number) => {
        mutateClickSendPayment({ id })
    }
    const { mutate: mutateDeleteAppointment } = useMutation(deleteAppointment, {
        onSuccess: () => refetch()
    })
    const columns = [
        columnHelper.accessor((row: any) => row, {
            id: "name",
            cell: ({ row }) => row.original.name,
            header: "Name",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "email",
            cell: ({ row }) => row.original.email,
            header: "Email",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "phone",
            cell: ({ row }) => row.original.phone,
            header: "Phone",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "dob",
            cell: ({ row }) => <span>
                {format(new Date(row.original.dob), 'd/M/Y')}
            </span>,
            header: "Date of Birth",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "bookingDateTime",
            cell: ({ row }) => <span>
                {format(new Date(row.original.bookingDateTime), 'yyyy-MM-dd hh:mm a')}
            </span>,
            header: "Appointment Date Time",
        }),
        columnHelper.accessor((row: any) => row.status, {
            id: "status",
            cell: (info) => {
                const { id, status } = info.row.original
                return (
                    <div className="">
                        {
                            <Select
                                className="w-[150px] md:w-[200px]"
                                name={id}
                                value={{ label: status, value: status }}
                                options={list}
                                isMulti={false}
                                onChange={(value) => handleChange(value, id)}
                                placeholder="Select Status"
                            />
                        }
                    </div>
                )
            },
            header: "Status",
        }),
        columnHelper.accessor((row: any) => row, {
            id: "createdAt",
            cell: ({ row }) => <span>{format(new Date(row.original.createdAt), 'yyyy-MM-dd hh:mm a')}</span>,
            header: "Created At",
        }),

        columnHelper.accessor((row: any) => row.id, {
            id: "actions",
            cell: (info: any) => {
                const { id, user, publish } = info?.row.original

                return (
                    <div className='flex items-center space-x-2'>
                        <Button
                            label=''
                            buttonType="success"
                            icon={<FaDollarSign className="w-5" />}
                            onClick={() => handleClickSendPayment(id)}
                            tooltipMsg="Send Payment For Booking Appointment"
                        />
                        <Button
                            label=''
                            buttonType="warning"
                            icon={<PencilSquareIcon className="w-5" />}
                            onClick={() => handleClick(id)}
                            tooltipMsg="Edit Booking Appointment"
                        />
                        <Button
                            label=''
                            buttonType="primary"
                            icon={<EyeIcon className="w-5" />}
                            onClick={() =>
                                handleShowBookAppointment(info.row.original)
                            }
                            tooltipMsg="Show Booking Appointment"
                        />


                        <Button
                            label=''
                            buttonType="danger"
                            icon={<TrashIcon className="w-5" />}
                            onClick={() => mutateDeleteAppointment({ id })}
                            tooltipMsg="Delete Appointment"
                        />
                    </div>
                );
            },
        }),
    ];
    const handleShowBookAppointment = (bookAppointment: any) => {
        setBookAppointment(bookAppointment)
        setShowBookAppointment(true)
    }
    const handleChange = (value: any, id: number) => {
        const submitData: any = {
            status: value.value,
            id
        }
        update(submitData)
    }
    const { mutate: update } = useMutation<any, Error>(appointmentStatusChange,
        {
            onSuccess: (data, variables: any) => {
                const { id, status } = variables
                setTableData((prev: any) => ([...prev.map((appointment: any) => {
                    if (appointment.id == id) {
                        return { ...appointment, status }
                    }
                    return appointment
                })]))
            }
        }
    );

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
                <title>{APP_NAME} | Dashboard</title>
            </Head>
            <div className='flex flex-col'>
                <div className='flex flex-row justify-between items-center'>
                    <PageTitle title='Book Appointment' />
                </div>
                <div className="flex justify-between items-center gap-x-2">
                    <div className="w-full">
                        <Search query={query} placeholder="Search book appointment..." handleSearch={handleSearch} />
                    </div>
                </div>
                <div className='-my-2 overflow-x-auto'>
                    <div className='py-2 align-middle inline-block min-w-full '>
                        <div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
                            <NewTable
                                data={tableData}
                                columns={columns}
                                sorting={sorting}
                                setSorting={setSorting}
                                pageCount={data?.meta.lastPage}
                                Page={page}
                                handlePaginationActon={handlePaginationActon}
                                isloading={isFetching}
                            />
                        </div>
                        <Modal isVisible={showBookAppointement} onClose={() => setShowBookAppointment(false)} isButtonVisible={false}>
                            <div>
                                <div className="px-4 sm:px-0">
                                    <h3 className="text-base font-semibold leading-7 text-gray-900">Booking Appointment</h3>
                                    <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">Detail Information</p>
                                </div>
                                <div className="mt-6 border-t border-gray-100">
                                    <dl className="divide-y divide-gray-100">
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Fullname</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.name}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.email}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Phone</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.phone}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Date of Birth</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.dob ? format(new Date(bookAppointment?.dob), 'd/M/Y') : ''}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Booking Date Time</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.bookingDateTime ? format(new Date(bookAppointment?.bookingDateTime), 'yyyy-MM-dd hh:mm a') : ''}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Status</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 font-semibold">{bookAppointment?.status}</dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Description</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                                                {bookAppointment?.description}
                                            </dd>
                                        </div>
                                        <div className="px-4 py-2 md:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900">Created At</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{bookAppointment?.created_at}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </Modal>
                        <SidePanel
                            isVisible={isVisible}
                            onClose={() => {
                                setEditModalVisible(false);
                                setFormErrors({});
                            }}
                            wide="2xl"
                            title={edit ? 'Edit Book Appointment' : 'Add Book Appointment'}
                            primaryButtonAction={() => {
                                setFormErrors({});
                                mutateBookAppointment(bookAppointment)
                            }}
                            primaryButtonLoading={updatingBookingAppointment}
                        >
                            <BookingAppointmentForm state={bookAppointment} setState={setBookAppointment} error={formerrors} edit={edit} />
                        </SidePanel>
                    </div>
                </div>
            </div>
        </>
    )
}
