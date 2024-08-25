import ModalButton from './ModalButton';
import ModalRoot from './ModalRoot';
import ModalText from './ModalText';
import ModalTitle from './ModalTitle';

export const Modal = Object.assign(ModalRoot, {
  Text: ModalText,
  Title: ModalTitle,
  Button: ModalButton,
});
