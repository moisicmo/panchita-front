import { useDispatch, useSelector } from 'react-redux';
import { coffeApi } from '@/services';
import { setTypeDocuments } from '@/store';


export const useTypeDocumentStore = () => {
    const { typeDocuments } = useSelector((state: any) => state.customers);
    const dispatch = useDispatch();

    const getTypeDocuments = async () => {
        const { data } = await coffeApi.get('/typeDocument');
        console.log(data)
        dispatch(setTypeDocuments({ typeDocuments: data.typeDocuments }))
    }

    return {
        //* Propiedades
        typeDocuments,
        //* Métodos
        getTypeDocuments,
    }
}