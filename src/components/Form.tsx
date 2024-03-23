import { useState, ChangeEvent, FormEvent, Dispatch } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Activity } from '../types'
import { categories } from '../data/categories'
import { ActivityActions } from '../reducers/activityReducer'

type FormProps = {
    dispatch: Dispatch<ActivityActions>
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}

export default function Form({ dispatch }: FormProps) {

    const [activity, setActivity] = useState<Activity>(initialState)

    const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
        const isNumberField = ['category', 'calories'].includes(e.target.id)

        setActivity({
            ...activity,
            [e.target.id]: isNumberField ? +e.target.value : e.target.value
        })
    }

    const isValidActivity = () => {
        return activity.name.trim() !== '' && activity.calories >= 0
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        dispatch({ type: 'save-activity', payload: { newActivity: activity } })

        setActivity({
            ...initialState,
            id: uuidv4()
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 bg-white shadow p-10 rounded-lg">
            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="category" className='font-bold'>Categoria:</label>
                <select value={activity.category} onChange={handleChange} name="category" id="category" className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {categories.map(category => (
                        <option value={category.id} key={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className='font-bold'>Actividad:</label>
                <input onChange={handleChange} type="text" id='name' className='border border-slate-300 p-2 rounded-lg'
                    placeholder='Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta' value={activity.name} />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className='font-bold'>Calorias:</label>
                <input onChange={handleChange} type="number" id='calories' className='border border-slate-300 p-2 rounded-lg' value={activity.calories} min={0}
                    placeholder='Calorias. Ej. 300, 500' />
            </div>

            <input type="submit" value={activity.category == 1 ? 'Guardar Comida' : 'Guardar Ejercicio'} className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10 disabled:cursor-not-allowed' disabled={!isValidActivity()} />
        </form>
    )
}
