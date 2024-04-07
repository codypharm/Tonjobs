import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NoPage = () => {

    const navigate = useNavigate();
    useEffect(() => {
        navigate('/');
    })
    return <h1>404</h1>;
};

export default NoPage;