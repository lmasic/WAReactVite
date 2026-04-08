import PropTypes from 'prop-types'; // npm install prop-types
import React, {
  createContext, useContext, useMemo, useState, useEffect,
} from 'react';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const url = PRODUCTION
    ? 'https://crm.skch.cz/v3/'
    : 'http://localhost/';

  const apiUrl = useMemo(() => `${url}rest.php/`, [url]);

  const [user, setUser] = useState('');
  useEffect(() => {
    const fetchUser = async () => {
      let data = 'reader';
      try {
        const response = await fetch(`${url}rest.php/user`);
        if (!response.ok) {
          setUser('');
        }
        data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    fetchUser();
  }, [url]);

  console.log(user);

  // toto vracím....
  const contextValue = useMemo(() => ({ url, apiUrl, user }), [url, apiUrl, user]);

  return (
    <UrlContext.Provider value={contextValue}>
      {children}
    </UrlContext.Provider>
  );
};

UrlProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUrl = () => useContext(UrlContext);

export const user = () => useContext(UrlContext);

export default UrlProvider;
