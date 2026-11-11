const signs = ["Dificultad para respirar o encías azuladas o pálidas", "Convulsiones o desmayo", "Sospecha de envenenamiento o de haber comido algo tóxico", "Abdomen hinchado y duro, o intentos de vomitar sin lograrlo", "No orina (en gatos machos es una urgencia)", "Sangrado que no para, golpes fuertes, atropello o caída", "Golpe de calor, temblores fuertes o parálisis", "Vómito o diarrea repetidos con decaimiento, sobre todo en cachorros y gatitos"]
export default function VetIA() {
  return (<div className="mx-auto max-w-2xl space-y-4"><h1 className="font-display text-3xl">KAI Vet IA</h1>
    <div className="card border-gold/60"><h2 className="font-semibold text-gold">Señales de urgencia</h2>
      <p className="mt-1 text-xs text-steel">Si ves alguna, no esperes: ve ahora a una veterinaria de urgencias.</p>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{signs.map(s => <li key={s}>{s}</li>)}</ul>
      <a className="btn-gold mt-4" target="_blank" rel="noreferrer" href="https://www.google.com/maps/search/?api=1&query=veterinaria%2024%20horas%20urgencias%20cerca%20de%20mi">Buscar veterinaria 24 h cerca</a></div>
    <div className="card text-sm"><h2 className="font-semibold">Asistente con IA</h2>
      <p className="mt-1 text-steel">Todavía no está activo. Necesita un servidor seguro y un proveedor de IA, que puede tener costo; te lo explicaré antes de activarlo. Cuando exista, orientará e identificará posibles urgencias, pero no dará diagnósticos ni medicamentos, y no reemplaza al veterinario.</p></div></div>)
}
