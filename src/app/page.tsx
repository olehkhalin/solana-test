import BacgkroundCanvas from "components/BacgkroundCanvas";
import TransferForm from "components/transfer-form/TransferForm";

export default function Home() {
  return (
    <main className="flex min-h-[100vh] items-center justify-center">
      <TransferForm />
      <BacgkroundCanvas />
    </main>
  );
}
