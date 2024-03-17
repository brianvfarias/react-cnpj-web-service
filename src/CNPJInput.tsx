import { useCallback, useEffect, useState } from "react"
import { CNPJInfo } from "./CNPJInfo";

export function CNPJInput() {
  const [cnpj, setCNPJ] = useState<string>('');
  const [invalid, setInvalid] = useState<boolean>(false)
  const [cnpjResponse, setCNPJResponse] = useState<string>('')
  const handleKeyUp = useCallback((e) => {
    let value = e.target.value.replace(/\D/g, "");
    console.log(value)
    value = e.target.value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    setCNPJ(value)
  }, [])

  useEffect(() => {
    setInvalid(false)
    let value = cnpj.replace(/\D/g, "");
    setCNPJResponse('')
    console.log("cnpj request", value);
    if (value.length === 14) {
      fetch(`https://publica.cnpj.ws/cnpj/${value}`)
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            return setInvalid(true)
          }
          setCNPJResponse(JSON.stringify(data))
          console.log(cnpjResponse)
        })
        .catch(_ => setInvalid(true))
    }
  }, [cnpj])

  return (
    <form style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: '1rem'
    }}>
      <label>Insira o CNPJ que deseja consultar abaixo: </label>
      <input
        id="cnpj"
        type="text"
        maxLength={20}
        placeholder="00.000.000/0000-00"
        value={cnpj}
        onChange={(e) => handleKeyUp(e)}
      />
      {invalid ? <small>CNPJ não encontrado</small> : null}
      {
        cnpjResponse !== "" ?
          <CNPJInfo CNPJResponse={cnpjResponse} />
          : null
      }
    </form>
  )
}
