const items: [string, string[]][] = [
  ["Primeros auxilios básicos", ["Mantén la calma y aleja a tu mascota del peligro.", "Con dolor, hasta la mascota más dócil puede morder: acércate con cuidado.", "No des medicamentos humanos ni provoques el vómito sin indicación de un veterinario.", "Sangrado: presiona con una gasa o tela limpia.", "Golpe de calor: llévala a la sombra y mójala con agua fresca, no helada.", "Llama a la veterinaria mientras vas en camino."]],
  ["Adiestramiento básico", ["Usa refuerzo positivo: premia lo que quieres que repita.", "Sesiones cortas, de 5 a 10 minutos, y constantes.", "Socializa a los cachorros con personas, sonidos y otros animales desde temprano.", "Evita los gritos y el castigo físico: generan miedo y empeoran la conducta."]],
  ["Vacunas y parásitos", ["El calendario lo define tu veterinario según la edad, la especie y la zona.", "Cachorros y gatitos necesitan un esquema de varias dosis y refuerzos.", "Desparasita por dentro y por fuera según su indicación.", "Guarda el carné y registra cada dosis en KAI Health."]],
  ["Convivencia con gatos", ["Ofrece rascadores y lugares altos para trepar.", "Mantén los areneros limpios y en sitios tranquilos; lo habitual es uno por gato más uno extra.", "Juega a diario: el aburrimiento también enferma."]]]
export default function Academy() {
  return (<div className="mx-auto max-w-2xl space-y-3"><h1 className="font-display text-3xl">KAI Academy</h1>
    <p className="card text-sm text-steel">Guías generales y educativas, aún sin revisión de un veterinario asesor. Los cursos en video llegan más adelante.</p>
    {items.map(([t, l]) => <details key={t} className="card"><summary className="cursor-pointer font-semibold text-gold">{t}</summary><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{l.map(x => <li key={x}>{x}</li>)}</ul></details>)}</div>)
}
