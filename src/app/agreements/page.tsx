import LegalDocument from '@/components/LegalDocument/LegalDocument';
import { AGREEMENT_TEXT } from '@/constants/doce';

export default function AgreementsPage() {
  return <LegalDocument text={AGREEMENT_TEXT} />;
}
