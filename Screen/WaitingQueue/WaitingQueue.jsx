import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import jsonApiService from '../services/jsonApiService';
import {useDispatch, useSelector} from 'react-redux';
import {updateWaitingQueue} from '../User/waitingQueueSlice';

const WaitingQueue = () => {
  const {guestUserId} = useSelector(state => state.user);
  const {status, position} = useSelector(state => state?.waitingQueue) || {};
  const dispatch = useDispatch();
  useEffect(() => {
    const LoadWaiting = async () => {
      const response = await jsonApiService.WaitingQueues();
      dispatch(updateWaitingQueue(response));
      if (response?.retry_after) {
        setTimeout(LoadWaiting, response?.retry_after);
      }
    };
    if (status === 'refresh') {
      LoadWaiting();
    }
    LoadWaiting();
  }, [guestUserId, jsonApiService.WaitingQueues, dispatch]);
  useEffect(() => {
    let TimeOutId;
    if (status == 'access') {
      TimeOutId = setTimeout(
        () => dispatch(updateWaitingQueue({status: 'expired'})),
        20 * 60 * 1000,
      );
      return () => {
        clearTimeout(TimeOutId);
      };
    }
  }, [status, dispatch]);
};
export default WaitingQueue;
const styles = StyleSheet.create({});
