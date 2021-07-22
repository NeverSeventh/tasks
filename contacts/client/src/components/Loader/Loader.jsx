import { useSelector } from "react-redux"





const Loader = (props) => {

    const isLoading= useSelector(state=>state.loading);

    return (
        <>
            {isLoading ?<>Loading...</> : <props.Component {...props} />  }
        </>
        

    )
}

export default Loader; 