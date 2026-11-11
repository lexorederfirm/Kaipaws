const dog = ["Chocolate y cacao", "Uvas y pasas", "Cebolla y ajo", "Xilitol (edulcorante de algunos chicles y productos)", "Nueces de macadamia", "Alcohol y cafeína", "Huesos cocidos (se astillan)"]
const cat = ["Cebolla y ajo", "Chocolate", "Uvas y pasas", "Alcohol y cafeína", "Lirios (planta muy peligrosa para gatos)", "Leche de vaca (muchos gatos no la toleran)"]
const List = ({ t, a }: { t: string; a: string[] }) => <div className="card"><h2 className="font-semibold text-gold">{t}</h2><ul className="mt-2 list-disc space-y-1 pl-5 text-sm">{a.map(x => <li key={x}>{x}</li>)}</ul></div>
export default function Nutrition() {
  return (<div className="mx-auto max-w-2xl space-y-4"><h1 className="font-display text-3xl">KAI Nutrition</h1>
    <p className="card text-sm text-steel">Información general y educativa. Aún no ha sido revisada por un veterinario asesor. No reemplaza la indicación de tu veterinario, sobre todo si tu mascota tiene alergias, enfermedades o está en tratamiento.</p>
    <List t="Alimentos peligrosos para perros" a={dog} /><List t="Alimentos y plantas peligrosas para gatos" a={cat} />
    <div className="card text-sm"><h2 className="font-semibold text-gold">Buenas prácticas</h2><ul className="mt-2 list-disc space-y-1 pl-5">
      <li>Agua fresca y limpia siempre disponible.</li>
      <li>Las cantidades dependen del alimento, el peso, la edad y la actividad: sigue la tabla de la etiqueta y ajusta con tu veterinario.</li>
      <li>Cambia de alimento poco a poco, mezclando durante varios días, para evitar problemas digestivos.</li>
      <li>Los gatos suelen preferir varias porciones pequeñas; los perros adultos, un horario fijo.</li>
      <li>Si tu mascota comió algo de las listas, llama a una veterinaria de inmediato.</li></ul></div></div>)
}
