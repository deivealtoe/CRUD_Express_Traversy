const express = require('express');
const uuid = require('uuid');
const router = express.Router();
let members = require('../../Members');


// Get all members
router.get('/', (request, response) => response.json(members));


// Get single member
router.get('/:id', (request, response) => {
    // Verify if the id exists in the array
    const exists = members.some(member => member.id === request.params.id);

    if (exists) {
        return response.json(members.find(member => member.id === request.params.id));
    }
    
    return response.status(400).json({ msg: `No member found with the ID of ${request.params.id}` });
});


// Create member -- I can use '/' again because they are different methods
router.post('/', (request, response) => {
    const newMember = {
        id: uuid.v4(),
        name: request.body.name,
        email: request.body.email,
        status: 'active'
    }

    if (!newMember.name || !newMember.email) {
        return response.status(400).json({ msg: "Please include a name and email" });
    }
    
    members.push(newMember);
    return response.json(members);
});


// Update member
router.put('/:id', (request, response) => {
    // Verify if the id exists in the array
    const exists = members.some(member => member.id === request.params.id);

    if (exists) {
        const updMember = request.body;

        members.forEach(member => {
            if (member.id === request.params.id) {
                member.name = updMember.name ? updMember.name : member.name;
                member.email = updMember.email ? updMember.email : member.email;
            }
        });

        return response.json({ msg: "Member updated", member: members.find(member => member.id === request.params.id) });
    }
    
    return response.status(400).json({ msg: `No member found with the ID of ${request.params.id}` });
});


// Delete a member
router.delete('/:id', (request, response) => {
    // Verify if the id exists in the array
    const exists = members.some(member => member.id === request.params.id);

    if (exists) {
        members = members.filter(member => member.id !== request.params.id);

        return response.json({
            msg: "Member deleted!",
            members
        })
    }
    
    return response.status(400).json({ msg: `No member found with the ID of ${request.params.id}` });
});


module.exports = router;