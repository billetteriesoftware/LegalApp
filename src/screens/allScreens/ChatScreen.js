import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import Header from '../../components/Header';
import Colors from '../../styles/Colors';
import {SendIcon} from '../../assets/svgIcons/Index';
import TextView from '../../components/TextView';
import FontFamily from '../../styles/FontFamily';
import {io} from 'socket.io-client';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useRef} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import NavigationString from '../../Navigations/NavigationString';

import Config from 'react-native-config';
import {emitreadCount, emitUnreadCount} from '../../utils/CommonMethod';
import {setupSocketConnection, socket} from '../SocketServices/Socket';

const ChatScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);

  const {profileData, badgeIcon} = useSelector(state => state.auth);
  let userId = profileData.id;
  let isAdmin = false;
  const [chatMessages, setChatMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // Initialize socket using useMemo to ensure it only initializes once
  const socketInitilazie = useMemo(() => io('http://102.37.211.135:4173'), []);

  const handleSend = () => {
    if (inputText.trim() === '') return;

    const message = {
      senderId: profileData.id,
      receiverId: '678f97064a575e74ed2b4b7d',
      message: inputText,
      isAdmin: false,
    };

    console.log('Sending message:', message); // Log the message before sending
    socketInitilazie.emit('sendMessage', message);
    setInputText(''); // Clear input after sending the message
  };

  function formatTimeStampChat(timestamp) {
    const date = new Date(timestamp);
    // Extracting date components
    const day = date.getDate();
    const month = date.toLocaleString('en-US', {month: 'short'});
    const year = date.getFullYear();
    // Extracting time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    // Convert hours to 12-hour format and pad with zero if needed
    hours = hours % 12 || 12;
    const formattedHours = hours.toString().padStart(2, '0');
    return `${formattedHours}:${minutes} ${ampm}`;

    return `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
  }

  const renderMessage = ({item}) => {
    const isSent = item.isAdmin;
    return (
      <View
        style={[
          styles.messageContainer,
          !isSent ? styles.sentContainer : styles.receivedContainer,
        ]}>
        {isSent && (
          <TextView textSty={styles.sender}>{item.sender}Admin</TextView>
        )}
        <TextView
          textSty={{
            ...styles.messageText,
            color: !isSent ? Colors.White : Colors.gray2,
          }}>
          {item.message}
        </TextView>
        <TextView
          textSty={{
            ...styles.messageTime,
            color: !isSent ? Colors.White : Colors.gray2,
          }}>
          {formatTimeStampChat(item.timestamp)}
        </TextView>
      </View>
    );
  };
  useEffect(() => {
    socketInitilazie.on('connect', () => {
      console.log('Socket connected!');
    });

    socketInitilazie.on('connect_error', error => {
      console.error('Socket connection error:', error);
    });

    socketInitilazie.on('disconnect', () => {
      console.log('Socket disconnected!');
    });

    // Emit the 'join' event when the component mounts
    socketInitilazie.emit('join', {userId, isAdmin});

    // Listen for incoming messages
    socketInitilazie.on('receiveMessage', message => {
      console.log('Received message:', message); // Log the full message object for debugging
      // emitreadCount(dispatch);

      // Avoid adding the message from the sender
      // if (message.senderId !== userId) {
      setChatMessages(prevMessages => {
        const updatedMessages = [...prevMessages, message]; // Add new message
        return updatedMessages;
      });
      // }
    });

    return () => {
      socketInitilazie.off('connect');
      socketInitilazie.off('connect_error');
      socketInitilazie.off('disconnect');
      socketInitilazie.off('receiveMessage');
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);

      return () => clearTimeout(timer); // Cleanup on unmount
    }, []),
  );

  useFocusEffect(
    React.useCallback(() => {
      // setupSocketConnection();
      setTimeout(() => {
        emitreadCount(dispatch);
      }, 200);
    }, [badgeIcon]),
  );

  async function getMessageHistory() {
    const adminId = '678f97064a575e74ed2b4b7d';

    const data = await axios.post(
      `http://102.37.211.135:4173/chat/${userId}/${adminId}`,
    );
    setChatMessages(data.data);

    return data.data;
  }

  useEffect(() => {
    getMessageHistory();
  }, [badgeIcon]);

  const handleNotification = useCallback(() => {
    navigation.navigate(NavigationString.NotificationScreen);
  }, []);

  const handleSideMunu = useCallback(() => {
    navigation.openDrawer();
  }, []);

  return (
    <SafeAreaView style={styles.safeView}>
      {/* Header View */}
      <Header
        radius
        onPress={handleSideMunu}
        types={'Publications'}
        title={'Chat'}
        clickNotification={handleNotification}
      />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}>
        <View style={styles.container}>
          <FlatList
            nestedScrollEnabled={true}
            data={chatMessages}
            renderItem={renderMessage}
            contentContainerStyle={styles.chatContainer}
          />
        </View>
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={inputText}
          onChangeText={setInputText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <SendIcon />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  safeView: {flex: 1, backgroundColor: Colors.bgColor},
  container: {
    flex: 1,
    justifyContent: 'center',
    // marginBottom: 60,
  },
  chatContainer: {
    padding: 16,
  },
  messageContainer: {
    borderWidth: 1,
    marginBottom: 12,
    maxWidth: '80%',
    borderRadius: 15,
    padding: 12,
  },
  receivedContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderColor: '#ECECEC',
  },
  sentContainer: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.TealBlue,
    borderColor: Colors.TealBlue,
  },
  messageText: {
    fontSize: 10,
    lineHeight: 20,
    color: Colors.gray2,
  },
  sender: {
    fontSize: 12,
    color: Colors.Black,
    lineHeight: 16.39,
    fontFamily: FontFamily.Bold,
    marginBottom: 4,
  },
  messageTime: {
    fontSize: 10,
    fontSize: 10,
    lineHeight: 20,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#DDDDDD',
  },
  input: {
    flex: 1,
    paddingRight: 45,
    backgroundColor: '#F8FCFC',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  sendButton: {
    position: 'absolute',
    right: 10,
    padding: 17,
  },
});
