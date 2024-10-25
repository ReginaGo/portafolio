function submition() {
    
    const date = document.querySelector('input[name="date"]').value;
    const timeStart = document.querySelector('input[name="time-start"]').value;
    const timeEnd = document.querySelector('input[name="time-end"]').value;
    const activity = document.querySelector('input[name="activity"]').value;
    const place = document.querySelector('input[name="place"]').value;

    //  campos obligatorios estén llenos
    if (date && timeStart && timeEnd && activity) {
        // Crear una nueva fila en la tabla
        const table = document.querySelector('.schedule-table tbody');
        const newRow = table.insertRow();

        
        const dateCell = newRow.insertCell(0);
        const timeStartCell = newRow.insertCell(1);
        const timeEndCell = newRow.insertCell(2);
        const activityCell = newRow.insertCell(3);
        const placeCell = newRow.insertCell(4);

        //  valores a las celdas
        dateCell.textContent = date;
        timeStartCell.textContent = timeStart;
        timeEndCell.textContent = timeEnd;
        activityCell.textContent = activity;
        placeCell.textContent = place || "N/A";
        
        
        document.querySelector('input[name="date"]').value = '';
        document.querySelector('input[name="time-start"]').value = '';
        document.querySelector('input[name="time-end"]').value = '';
        document.querySelector('input[name="activity"]').value = '';
        document.querySelector('input[name="place"]').value = '';
    } else {
        alert("Por favor, completa todos los campos obligatorios.");
    }
}