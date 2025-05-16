import { useEffect, useState } from "react";
import {
  getFromLocalStorage,
  setToLocalStorage,
} from "../../services/local-storage-service";

const STORAGE_KEY = "product-cep";

export default function ProductShipping() {
  const [cep, setCep] = useState("");
  const [error, setError] = useState("");
  const [address, setAddress] = useState<null | {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
  }>(null);

  useEffect(() => {
    const stored = getFromLocalStorage<{ value: string }>(STORAGE_KEY);
    if (stored?.value) setCep(stored.value);
  }, []);

  const formatCep = (value: string) => value.replace(/\D/g, "").slice(0, 8);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCep(e.target.value);
    setCep(formatted);
    setError("");
    setAddress(null);
  };

  const handleCheck = async () => {
    if (cep.length !== 8) {
      setError("Digite um CEP válido com 8 números.");
      return;
    }

    setToLocalStorage(STORAGE_KEY, cep);

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();

      if (data.erro) {
        setError("CEP não encontrado.");
        setAddress(null);
      } else {
        const { logradouro, localidade, bairro, uf } = data;
        setAddress({
          street: logradouro,
          neighborhood: bairro,
          city: localidade,
          state: uf,
        });
        setError("");
      }
    } catch {
      setError("Erro ao buscar o CEP. Tente novamente.");
    }
  };

  return (
    <section className="w-full max-w-md mx-auto mt-6">
      <h2 className="text-md text-left font-medium">
        Disponibilidade de Entrega
      </h2>

      <div className="flex gap-2 mt-2 mb-2 bg-[#f9f9f9] p-3 rounded-md shadow-custom-light">
        <input
          type="text"
          placeholder="Digite seu CEP"
          value={cep}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 w-full color-black placeholder-black bg-white"
        />
        <button
          onClick={handleCheck}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer transition"
        >
          Verificar
        </button>
      </div>

      {error && <p className="flex text-red-500 text-sm text-left">{error}</p>}

      {address && (
        <div className="mt-2 text-sm text-gray-800 text-left">
          <p>{address.street}</p>
          <p>
            {address.neighborhood} - {address.city}/{address.state}
          </p>
        </div>
      )}
    </section>
  );
}
