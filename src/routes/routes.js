import React from 'react';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Receipt from '@material-ui/icons/Receipt';

export const mainRoutes = [
    { text: 'Бюджет', path: '/budget', icon: <MonetizationOnIcon /> },
    { text: 'Добавить чек', path: '/bill', icon: <Receipt /> },
    { text: 'Список покупок', path: '/shopingCard', icon: <ShoppingCartIcon /> },
];

