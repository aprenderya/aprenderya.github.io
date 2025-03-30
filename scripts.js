let adsViewed = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && !event.shiftKey) {
        event.preventDefault(); // Prevent default tab behavior
    }
});

function showAdMenu() {
    const adMenu = document.createElement('div');
    adMenu.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
        background: white;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 1000;
    `;
    adMenu.innerHTML = `
        <h2 style="margin-bottom: 20px; font-size: 1.5rem; color: #333;">Para acceder a la sección de juegos, mira el anuncio:</h2>
        <button id="adButton" onclick="viewAd('https://povaique.top/4/9151294')" style="
            margin: 10px;
            padding: 10px 20px;
            font-size: 1rem;
            background: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background 0.3s ease;
        " onmouseover="this.style.background='#0056b3'" onmouseout="this.style.background='#007bff'">Ver Anuncio</button>
    `;
    document.body.appendChild(adMenu);
}

function viewAd(adUrl) {
    window.open(adUrl, '_blank');
    const adMenu = document.querySelector('div[style*="z-index: 1000"]');
    adMenu.remove(); // Elimina el menú de anuncios
}

function openWindow(url, title) {
    const windowContainer = document.createElement('div');
    windowContainer.classList.add('draggable-window');
    windowContainer.style.width = '500px'; // Default width
    windowContainer.style.height = '400px'; // Default height
    windowContainer.innerHTML = `
        <div class="draggable-header">
            <div class="window-controls">
                <button class="close-btn" onclick="closeWindow(this)"></button>
                <button class="minimize-btn" onclick="minimizeWindow(this)"></button>
                <button class="maximize-btn" onclick="maximizeWindow(this)"></button>
            </div>
            <span class="window-title">${title}</span>
        </div>
        <div class="draggable-content">
            <iframe src="${url}" frameborder="0" style="width: 100%; height: 100%;"></iframe>
        </div>
    `;
    document.body.appendChild(windowContainer);

    makeDraggable(windowContainer);
}

function closeWindow(button) {
    const windowContainer = button.closest('.draggable-window');
    windowContainer.remove();
}

function minimizeWindow(button) {
    const windowContainer = button.closest('.draggable-window');
    const content = windowContainer.querySelector('.draggable-content');
    if (content.style.display === 'none') {
        content.style.display = 'block';
        windowContainer.style.height = '300px';
    } else {
        content.style.display = 'none';
        windowContainer.style.height = '40px';
    }
}

function maximizeWindow(button) {
    const windowContainer = button.closest('.draggable-window');
    if (windowContainer.classList.contains('maximized')) {
        windowContainer.classList.remove('maximized');
        windowContainer.style.width = '400px';
        windowContainer.style.height = '300px';
        windowContainer.style.top = '20%';
        windowContainer.style.left = '20%';
    } else {
        windowContainer.classList.add('maximized');
        windowContainer.style.width = '100%';
        windowContainer.style.height = '100%';
        windowContainer.style.top = '0';
        windowContainer.style.left = '0';
    }
}

function makeDraggable(element) {
    const header = element.querySelector('.draggable-header');
    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - element.offsetLeft;
        offsetY = e.clientY - element.offsetTop;

        // Optimize by using `transform` instead of `left` and `top`
        const initialTransform = window.getComputedStyle(element).transform;
        let startX = 0, startY = 0;
        if (initialTransform !== 'none') {
            const matrix = initialTransform.match(/matrix.*\((.+)\)/)[1].split(', ');
            startX = parseFloat(matrix[4]);
            startY = parseFloat(matrix[5]);
        }

        const onMouseMove = (e) => {
            if (isDragging) {
                const translateX = startX + (e.clientX - offsetX);
                const translateY = startY + (e.clientY - offsetY);
                element.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
        };

        const onMouseUp = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
}

function showHubsGames() {
    openWindow('https://www.hoodamath.com/games/unblocked.html#gsc.tab=0', 'HUBS GAMES');
}

function showHacksKahoot() {
    openWindow('https://kahoot.club/', 'HACKS KAHOOT');
}

function showUnblockBrowsers() {
    openWindow('https://www.croxyproxy.com/', 'CroxyProxy');
}
