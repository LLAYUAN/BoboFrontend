import './App.css';
import AppRouter from './router/router';
import {ConfigProvider} from "antd";

function App() {
  return (
      <ConfigProvider
          theme={{
            token: {
                colorPrimary: '#531dab',
                colorLink: '#531dab',

             // borderRadius: 2,

              // 派生变量，影响范围小
              //colorBgContainer: '#fff',
            },
          }}

      >
       <AppRouter />
      </ConfigProvider>
  );
}

export default App;
