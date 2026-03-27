function showPage(pageId, event) {
    // Ocultar todas las páginas
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Mostrar la seleccionada
    const target = document.getElementById('page-' + pageId);
    if(target) target.classList.add('active');

    // Actualizar botones si existen
    if(event) {
        document.querySelectorAll('.demo-tab').forEach(t => t.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }
}

// Auto-redirigir del Splash al Login después de 3.5 segundos
window.onload = () => {
    setTimeout(() => {
        const splash = document.getElementById('page-splash');
        if(splash.classList.contains('active')) {
            showPage('login');
        }
    }, 3500);
};