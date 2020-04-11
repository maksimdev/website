import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title/Title';

export default function Chart({ data, isLoading }) {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Title>Расходы за текущий месяц {isLoading ? <LinearProgress /> : <></>} </Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="date" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Руб.
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}