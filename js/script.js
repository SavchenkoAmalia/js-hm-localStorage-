document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');
    
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function renderContacts() {
        contactList.innerHTML = '';
        contacts.forEach((contact, index) => {
            const li = document.createElement('li');
            li.innerHTML = 
                `<span>${contact.firstName} ${contact.lastName} - ${contact.phone} - ${contact.email}</span>
                <button class="edit" data-index="${index}">Редагувати</button>
                <button class="delete" data-index="${index}">Видалити</button>`
            ;
            contactList.appendChild(li);
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        const newContact = { firstName, lastName, phone, email };

        contacts.push(newContact);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        form.reset();
        renderContacts();
    });

    contactList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const index = e.target.dataset.index;
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
        }
    });


    contactList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            const index = e.target.dataset.index;
            const contact = contacts[index];

            document.getElementById('first-name').value = contact.firstName;
            document.getElementById('last-name').value = contact.lastName;
            document.getElementById('phone').value = contact.phone;
            document.getElementById('email').value = contact.email;

            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
        }
    });

    renderContacts();
});