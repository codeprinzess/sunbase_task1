document.addEventListener('DOMContentLoaded', () => {
  const filterDropdown = document.getElementById('filterDropdown');
  const clientList = document.getElementById('clientList');
  const popup = document.getElementById('popup');
  const popupName = document.getElementById('popupName');
  const popupPoints = document.getElementById('popupPoints');
  const popupAddress = document.getElementById('popupAddress');

  fetch('https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=client_data')
    .then(response => response.json())
    .then(data => {
      // Display the list of clients
      data.forEach(client => {
        const listItem = document.createElement('li');
        listItem.classList.add('client-item');
        listItem.textContent = `${client.label} - Points: ${client.points}`;
        listItem.dataset.name = client.label;
        listItem.dataset.points = client.points;
        listItem.dataset.address = client.address;
        clientList.appendChild(listItem);

        listItem.addEventListener('click', () => {
          // Display the popup when clicking on a client
          popupName.textContent = listItem.dataset.name;
          popupPoints.textContent = `Points: ${listItem.dataset.points}`;
          popupAddress.textContent = `Address: ${listItem.dataset.address}`;
          popup.classList.add('open');
        });
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  popup.addEventListener('click', () => {
    // Close the popup when clicking on it
    popup.classList.remove('open');
  });

  filterDropdown.addEventListener('change', () => {
    // Apply the selected filter to the client list
    const filterValue = filterDropdown.value;
    const clients = document.querySelectorAll('.client-item');

    clients.forEach(client => {
      if (filterValue === 'all') {
        client.style.display = 'block';
      } else if (filterValue === 'managers') {
        const isManager = client.dataset.isManager === 'true';
        client.style.display = isManager ? 'block' : 'none';
      } else if (filterValue === 'nonManagers') {
        const isManager = client.dataset.isManager === 'true';
        client.style.display = isManager ? 'none' : 'block';
      }
    });
  });
});
