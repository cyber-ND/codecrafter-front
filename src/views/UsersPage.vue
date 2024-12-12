<template>
     <nav class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">Code Crafters Users</h1>
                </div>

                <div class="flex items-center space-x-4">
                    <router-link to="/" class="hover: bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                    <router-link to="/users" class="hover: bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Users</router-link>
                </div>
            </div>
        </div>
    </nav>
    <div class="p-8">
        <h1 class="text-2xl font-bold mb-6">Users</h1>
        <table class="min-w-full bg-white border">
            <thead>
                <tr>
                    <th class="px-4 py-2 border">Name</th>
                    <th class="px-4 py-2 border">Email</th>
                    <th class="px-4 py-2 border">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user._id">
                    <td class="px-4 py-2 border font-semibold">{{ user.name }}</td>
                    <td class="px-4 py-2 border font-semibold">{{ user.email }}</td>
                    <td class="px-4 py-2 border font-semibold flex space-x-2">
                        <router-link :to="`/users/edit/${user._id}`" class="bg-blue-500 text-white px-4 py-1 rounded">Edit</router-link>
                        <button class="bg-red-500 text-white px-4 py-1 rounded" @click="deleteUsers(user._id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
        
</template>


<script>

import axios from 'axios'; 

export default{
    data(){
        return{
            users:[]
        }
    },
    methods:{
       async fetchUsers(){
           try {
            const response = await axios.get('http://localhost:3000/api/users')
            this.users = response.data;
           } catch (error) {
            console.log("Error fetching users:", error);
            
           }
        },
        async deleteUsers(id){
            if (confirm('Are you sure you want to delete this user?')){
                try {
                    await axios.delete(`http://localhost:3000/api/users/${id}`)
                    this.users = this.users.filter(user => user._id !== id);
                    this.$toast.success('User deleted Successfully!!!');
                } catch (error) {
                    console.log('Error deleting user:', error);
                    
                }
            }
        }

    },
    created(){
        this.fetchUsers();
    }
}


</script>