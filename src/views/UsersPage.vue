<template>
     <nav class="bg-gray-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16 items-center">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold">Code Crafters Users</h1>
                </div>

                <div class="flex items-center space-x-4">
                    <router-link to="/" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Home</router-link>
                    <router-link to="/users" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Users</router-link>

                   <div v-if="!isAuthenticated">
                    <router-link to="/login" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Login</router-link>
                    <router-link to="/register" class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">Register</router-link>
                   </div>

                   <div v-else>
                     <button class="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium" @click="logout">Logout</button>                    
                   </div>
                   
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
    computed: {
      isAuthenticated(){
          return !! localStorage.getItem('token');
      }
    },
    methods:{
       async fetchUsers(){
           try {
            const token = localStorage.getItem('token')
            const response = await axios.get('https://codecrafter-backend.onrender.com/api/users', {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            this.users = response.data;
           } catch (error) {
            console.log("Error fetching users:", error);
            
           }
        },
        async deleteUsers(id){
            if (confirm('Are you sure you want to delete this user?')){
                try {
                    const token = localStorage.getItem('token')
                    await axios.delete(`https://codecrafter-backend.onrender.com/api/users/${id}`, {
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    this.users = this.users.filter(user => user._id !== id);
                    this.$toast.success('User deleted Successfully!!!');
                } catch (error) {
                    console.log('Error deleting user:', error);
                    
                }
            }
        },
        logout(){
        localStorage.removeItem('token');
        this.$router.push('/login')
        this.$toast.success('User logged out Successfully!!!');
    }

    },
    created(){
        this.fetchUsers();
    }
}


</script>