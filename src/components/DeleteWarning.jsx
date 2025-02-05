import propTypes from 'prop-types'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { Modal, Button } from 'flowbite-react';

const DeleteWarning = ({type, showModal, setShowModal, onOK}) => {
  return (
    <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this {type}?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={onOK}>
                Yes, I&apos;m sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
  )
}

DeleteWarning.propTypes = {
 type: propTypes.string.isRequired,
 showModal: propTypes.bool.isRequired,
 setShowModal: propTypes.func.isRequired,
 onOK: propTypes.func.isRequired,
}
export default DeleteWarning
