
import { Table, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { Trash2 } from 'lucide-react';
import DeleteWarning from './DeleteWarning';
import toast from 'react-hot-toast';
import { baseURL } from '../util';
import { API } from '../API/setup';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const res = await API.get(`${baseURL}/user/getusers`);
        const data = await res.data;
        if (data) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }finally{
        setLoading(false)
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await API.get(`${baseURL}/user/getusers?startIndex=${startIndex}`);
      const data = await res.data;
      if (data) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    try {

      // TODO: add loading state to the modal, prevent multiclick  
        const res = await API.delete(`${baseURL}/user/delete/${userIdToDelete}`);
        const data = await res.data;
        if (data) {
            setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
            setShowModal(false);
        } else {
            console.log(data.message);
            toast.success('post deleted Successfully')
        }
    } catch (error) {
        console.log(error.message);
        toast.error(`user deletetion falied, ${error.message}`)
    }
  };

  return (
    <div className='table-auto overflow-hidden overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 py-16'>
      {currentUser.isAdmin && users.length > 0 ? (
        <div className='w-[95vw] sm:w-[70vw] table-auto overflow-x-scroll mx-auto scrollbar scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 shadow-md'>
          <Table hoverable className='shadow-md' >
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <Table.Body className='divide-y' key={user._id}>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>
                    <img
                      src={user.profilePicture}
                      alt={user.username}
                      className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                      />
                  </Table.Cell>
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.email}</Table.Cell>
                  <Table.Cell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    {user.isAdmin ? (
                      <FaCheck className='text-green-500' />
                    ) : (
                      <FaTimes className='text-red-500' />
                    )}
                  </Table.Cell>
                  <Table.Cell>
                  {
                    !user.isAdmin &&
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                     <Trash2 className="text-red-500"/>
                    </span>
                  }
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
        </div>
      ) : (
        <>
        {
          loading ? 
          <div className="flex items-center justify-center">
              <Spinner />
            </div> : 
           <p>You have no user yet!</p>   
        }
        </>
      )}

      <DeleteWarning  type='user' showModal={showModal}  setShowModal={setShowModal} 
        onOK={handleDeleteUser}
      />
    </div>
  );
}
