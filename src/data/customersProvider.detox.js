import customers from './customers.json';

const customersProvider = () => customers.slice(0, 2);

export default customersProvider;
