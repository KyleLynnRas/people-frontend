import { useEffect, useState} from "react"
import {Route, Switch} from "react-router-dom"
import Index from "../pages/Index"
import Show from "../pages/Show"

const Main = (props) => {

    const [people, setPeople] = useState(null)

    const URL = "https://people-api-backend-kr.herokuapp.com/people/"

    //index
    const getPeople = async () => {
        const response = await fetch(URL)
        const data = await response.json()
        setPeople(data)
    }

    //create
    const createPeople = async (person) => {
        await fetch(URL, {
            method: "post",
            headers: {
            //what kind of data sending 
            "Content-Type": "application/json",
            }, 
            //turns JSON obj into string 
            body: JSON.stringify(person),
        })
        //update state/get new list 
        getPeople()
    }

    //update - based on formData (in show)
    const updatePeople = async (person, id) =>{
      //adding id to end of url 
      await fetch(URL + id, {
        //put request to update
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      })
      // update state
      getPeople()
    }

    //delete
    const deletePeople = async (id) => {
      await fetch(URL + id, {
        method: "delete",
      })
      getPeople()
    }

    useEffect(() => getPeople(), [])

    return(
        <main>
        <Switch>
          <Route exact path="/">
            <Index people={people} createPeople={createPeople} />
          </Route>
          <Route path="/people/:id" render={(routerProps) => <Show
              people={people}
              updatePeople={updatePeople}
              deletePeople={deletePeople}
              {...routerProps}
            />}
          />
        </Switch>
      </main>
    )
}

export default Main