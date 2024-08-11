import React, { useEffect, useState } from 'react';
import ChatMessage from './ChatMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../redux/chatSlice';

const LiveChat = () => {
    const [liveMessage, setLiveMessage] = useState("");
    const [isShowChat, setIsShowChat] = useState(true);
    const dispatch = useDispatch();
    const chatMessages = useSelector((store) => store.chat.message);

    const fetchData = async () => {
        const randomId = Math.floor(Math.random() * 898) + 1; // Pokémon IDs range from 1 to 898
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
        const data = await response.json();

        // Create a random message using Pokémon's name and its types
        const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');
        const message = `${data.name}  ${types}.`;

        dispatch(addChat({
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1), // Capitalize the Pokémon name
            message: message
        }));
    };

    useEffect(() => {
        const timer = setInterval(() => fetchData(), 1000); // Fetch new data every 1 seconds
        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addChat({
            name: 'Kasani Tirumala Teja',
            message: liveMessage
        }));
        setLiveMessage('');
    };

    return (
        <>
            {
                !isShowChat ?
                    (<div className='w-[364px] h-[20px] mx-3 text-center'>
                        <button onClick={() => setIsShowChat(true)} className='rounded-full hover:bg-gray-200 border py-1 w-full text-[14px]'>Show Chat</button>
                    </div>)
                    :
                    (
                        <div className='w-[400px] h-[700px] border rounded-lg'>
                            <div className='h-[40px] p-2 m-2'>Top Chat</div>
                            <hr className="h-[1px] my-2 border-b-[1px] border-0" />
                            <div className='h-[470px] overflow-y-scroll overflow-hidden flex flex-col-reverse'>
                                {
                                    chatMessages.map((msg, i) => (
                                        <ChatMessage key={i} name={msg.name} message={msg.message} />
                                    ))
                                }
                            </div>
                            <hr className="h-[1px] my-2 border-b-[1px] border-0" />
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <div className='flex px-3 my-2'>
                                    <img className='h-6 rounded-full' alt='user-icon' src='https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png' />
                                    <div className='px-3 w-full'>
                                        <div className='font-medium text-[13px] text-gray-500'>Kasani Tirumala Teja</div>
                                        <input 
                                            value={liveMessage} 
                                            onChange={(e) => setLiveMessage(e.target.value)} 
                                            maxLength="200" 
                                            className='border-b-[1px] border-gray-400 h-7 outline-none text-[13px] w-full focus:border-blue-500 focus:border-b-[2px] pb-2' 
                                            type='text' 
                                            placeholder='Chat...' 
                                        />
                                        <div className='flex justify-end text-gray-500 text-[13px] mt-2'>
                                            <span className='mr-3'>{liveMessage.length}/200</span>
                                            <button className='border rounded-full px-3'>Send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <hr className="h-[1px] my-2 border-b-[1px] border-0" />
                            <div className='mx-3 text-center'>
                                <button onClick={() => setIsShowChat(false)} className='hover:rounded-full hover:bg-gray-200 py-1 w-full text-[14px]'>Hide Chat</button>
                            </div>
                        </div>
                    )
            }
        </>
    );
};

export default LiveChat;