import { useEffect } from 'react';
import clsx from 'clsx';

const ID = 'modal-react-component';

let $modalBackDrop = null;

// Only one modal should be shown on the page at any one time.
function Modal({ children, isShown, onClose }) {
  useEffect(() => {
    if (isShown) {
      document.body.classList.add('modal-open');
      $modalBackDrop = document.createElement('div');
      $modalBackDrop.className = 'modal-backdrop fade show';
      document.body.appendChild($modalBackDrop);
    } else {
      document.body.classList.remove('modal-open');
      if (!$modalBackDrop) {
        return;
      }
      $modalBackDrop.parentNode.removeChild($modalBackDrop);
      $modalBackDrop = null;
    }
  }, [isShown, $modalBackDrop]);

  return (
    <div
      className={clsx('modal', {
        show: isShown,
      })}
      tabIndex="-1"
      style={{
        display: isShown ? 'block' : 'none',
      }}
      // So that clicking the modal background will dismiss it.
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(event) => {
          // Stop click events within the modal from dismissing it.
          event.stopPropagation();
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <button
              aria-label="Close"
              className="close"
              onClick={onClose}
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
