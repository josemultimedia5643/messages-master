import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View, Text, Button } from "react-native";
import db from "../db";

import firebase from "firebase/app";
import "firebase/auth";

export default function LinksScreen() {
  const [users, setUsers] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [friends, setFriends] = useState(null);

  useEffect(() => {
    //console.log("----userArr-----", userArr);
    handleCurrentUser();
    handleUsers();
    handleFriend();
  }, []);

  useEffect(() => {
    //console.log("----userArr-----", friends);
  }, [friends]);

  const handleUsers = () => {
    db.collection("users").onSnapshot(querySnapshot => {
      const userArr = [];
      querySnapshot.forEach(doc => {
        userArr.push({ id: doc.id, ...doc.data() });
      });
      setUsers([...userArr]);
    });
  };

  const addFriend = id => {
    console.log(currentUser);
    var friends = [];
    if (currentUser.friends !== []) {
      friends = [...currentUser.friends, id];
    } else {
      friends.push(id);
    }

    db.collection("users")
      .doc(currentUser.id)
      .update({ friends });
  };

  const handleCurrentUser = () => {
    db.collection("users")
      .doc(firebase.auth().currentUser.uid)
      .onSnapshot(querySnapshot => {
        //console.log(querySnapshot.data().friends);
        setCurrentUser({ id: querySnapshot.id, ...querySnapshot.data() });
      });
  };

  const handleFriend = () => {
    db.collection("users")
      .doc(currentUser.id)
      .onSnapshot(doc => {
        doc.data().friends.map(friend =>{
          
        })
      });
  };

  return (
    <ScrollView style={styles.container}>
      {users &&
        users.map(user => (
          <View key={user.id}>
            <Text>{user.displayName}</Text>
            <Button title="Add Friend" onPress={() => addFriend(user.id)} />
          </View>
        ))}

      <Text>Friends:</Text>
      {friends && <Text>hello</Text>}
      {friends && friends.map(friend => <Text key={friend}>{friend}</Text>)}
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: "Links"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
