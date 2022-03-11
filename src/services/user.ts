
import request from '../utils/request'
import {
  IfetchMyInfoRes,
} from './user.d'

export default {
  fetchMyInfo(): Promise<IfetchMyInfoRes> {
    return request.get('/applet/user/myInfo')
  },
}
