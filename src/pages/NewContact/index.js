import Button from '../../components/Button';
import Input from '../../components/Input';
import PageHeader from '../../components/PageHeader';
import Select from '../../components/Select';

export default function NewContact() {
  return (
    <>
      <PageHeader title="New Contact" />
      <Input type="text" placeholder="Name" />
      <Select>
        <option value="123">Instagram</option>
        <option value="123">Instagram</option>
        <option value="123">Instagram</option>
      </Select>
      <Button type="button">
        Save changes
      </Button>
      <Button type="button" disabled>
        Save changes
      </Button>
    </>
  );
}
