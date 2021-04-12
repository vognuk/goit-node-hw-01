const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const contactsPath = path.join(__dirname, './db/contacts.json')

//Use this function to view list of contacts from contacts.json
function listContacts() {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        try {
            const contactsData = JSON.parse(data);
            console.table(contactsData)
        } catch (error) {
            console.log('listContacts error', error)
        }
    })
}

/*Use this function to view contact with the id 
from contacts.json.*/
function getContactById(contactId) {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        try {
            const contactsData = JSON.parse(data);
            const contactWithId = contactsData.find(contact => contact.id === contactId);
            console.log(`Contact with Id=${contactId}:`, contactWithId)
        } catch (error) {
            console.log('listContacts error', error)
        }
    })
}

/*Use this function to remove contact by id 
from contacts.json.*/
function removeContact(contactId) {
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        try {
            const contactsData = JSON.parse(data);
            let changedData = [];
            const contactWithId = contactsData.map(contact => {
                if (contact.id !== contactId) {
                    return changedData.push(contact);
                }
                console.log(`Contact with id ${contact.id} was removed.`)
            });

            console.table(changedData);

            fs.writeFile('./db/contacts.json', JSON.stringify(changedData),
                (err, changedData) => {
                    if (err) {
                        console.log(err);
                    }
                })
        } catch (error) {
            console.log('listContacts error', error)
        }
    })
}

/*Use this function to add one contact with generated id 
(random and unique) to contacts.json.*/
function addContact(name, email, phone) {
    const id = uuidv4();
    fs.readFile(contactsPath, "utf-8", (error, data) => {
        try {
            const contactsData = JSON.parse(data);
            let changedData = [];

            const contactWithId = contactsData.map(contact => {
                changedData.push(contact);
                return changedData;
            });

            changedData.push({ id, name, email, phone });
            console.table(changedData);

            fs.writeFile('./db/contacts.json', JSON.stringify(changedData), (err, changedData) => {
                if (err) {
                    console.log(err);
                }
            })
        } catch (error) {
            console.log('listContacts error', error)
        }
    })
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}
