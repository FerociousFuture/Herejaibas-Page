// Cargar Partidas
async function cargarPartidas() {
    const cuerpo = document.getElementById('cuerpo-partidas');
    if (!cuerpo) return;

    const { data, error } = await supabase.from('partidas').select('*').order('fecha', { ascending: false });

    if (error) {
        cuerpo.innerHTML = `<tr><td colspan="4">Error al cargar partidas</td></tr>`;
        return;
    }

    if (data.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="4">No hay partidas registradas aún.</td></tr>`;
        return;
    }

    cuerpo.innerHTML = data.map(p => `
        <tr>
            <td>${new Date(p.fecha).toLocaleDateString()}</td>
            <td>${p.nombre_partida}</td>
            <td>${p.jugadores}</td>
            <td>${p.resultado}</td>
        </tr>
    `).join('');
}

// Cargar Tracker
async function cargarTracker() {
    const cuerpo = document.getElementById('cuerpo-tracker');
    if (!cuerpo) return;

    const { data, error } = await supabase.from('tracker').select('*').order('puntos', { ascending: false });

    if (error) {
        cuerpo.innerHTML = `<tr><td colspan="3">Error al cargar el tracker</td></tr>`;
        return;
    }

    if (data.length === 0) {
        cuerpo.innerHTML = `<tr><td colspan="3">No hay jugadores registrados aún.</td></tr>`;
        return;
    }

    cuerpo.innerHTML = data.map(t => `
        <tr>
            <td style="color: var(--accent-gold); font-weight: bold;">${t.nombre_jugador}</td>
            <td>${t.puntos}</td>
            <td>Nivel ${t.nivel}</td>
        </tr>
    `).join('');
}

// Ejecutar funciones según la página
document.addEventListener('DOMContentLoaded', () => {
    cargarPartidas();
    cargarTracker();
});
