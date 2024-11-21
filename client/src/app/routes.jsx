import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from '../features/auth/login.jsx';
import { Register } from '../features/auth/register.jsx';
import { ListDokter } from '../features/listDokter/ListDokter.jsx';
import { ChatDokter } from '../features/chat-dokter/ChatDokter.jsx';
import { Chat } from '../features/chat/chat.jsx';

export const AppRouter = () => {
    return (
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}/>
            <Route path='/chat-apps/list-dokter' element={<ListDokter/>}/>
            <Route path='/chat-apps/chat/:konsultasiId' element={<Chat/>}/>
            <Route path='/chat-apps/dokter-chat' element={<ChatDokter/>}/>            
        </Routes>
      </BrowserRouter>
    );
  };    