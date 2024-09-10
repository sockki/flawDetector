import LegalDocument from '@/components/LegalDocument/LegalDocument';
import { PPA_TEXT } from '@/constants/doce';

export default function PpaPage() {
  return <LegalDocument text={PPA_TEXT} />;
}
