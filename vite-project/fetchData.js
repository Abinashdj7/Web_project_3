export async function fetchUsers() {
	try {
		const url = "http://localhost:3000/api/users"

		const res = await fetch(url)
		if (!res.ok) throw new Error("Error with the connection")
		const data = await res.json()
		console.log(data)
	} catch (error) {
		console.error(error)
	}
}