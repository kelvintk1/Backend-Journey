export async function getUserData(name) {
    try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
        const  data = await res.json();
        const user = data.find(user => user.name === name);
        if(!user){ 
            throw new Error('User name not found')
        } else{
            return console.log(user);
        }
    } catch (error) {
        console.log('Something went wrong:', error.message);
    } finally {
        console.log('Fetch attempt finished');
    }
}
