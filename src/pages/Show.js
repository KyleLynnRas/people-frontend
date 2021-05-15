import {useState} from "react"

const Show = (props) => {
    //grab id from the url (from router props)
    const id = props.match.params.id
    const people = props.people 
    //find method on people arr - returns first true
    const person = people.find((p) => {
        return p._id === id
    })
    // console.log(person)
    //state for form 
    const [editForm, setEditForm] = useState(person)

    //handleChange for form
    const handleChange = event => {
        setEditForm({
             ...editForm, [event.target.name]: event.target.value 
            })
      }

    //on form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        //editform becomes people in main func
        props.updatePeople(editForm, person._id)
        //redirect to index (history.push from rp)
        props.history.push("/")
    }

    //delete
    const removePerson = () => {
        //func from main
        props.deletePeople(person._id)
        props.history.push("/")
    }

    return(
        <div className="person">
        <h1>{person.name}</h1>
        <h2>{person.title}</h2>
        <img src={person.image} alt={person.name} />
        <button onClick={removePerson} id="delete">Byeee!</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.name}
            name="name"
            placeholder="name"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.image}
            name="image"
            placeholder="image URL"
            onChange={handleChange}
          />
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
          />
          <input type="submit" value="Update Person" />
        </form>
    </div>
    )
}

export default Show