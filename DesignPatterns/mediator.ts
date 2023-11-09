/**
 * 中介者模式
 * 主要角色：
 * 1. 抽象中介者：是中介者的接口，提供了同事对象注册与转发同事对象信息的抽象方法
 * 2. 具体中介者：实现中介者接口，定义一个list来管理同事对象，协调个个同事角色之间的交互关系，因此它依赖于同事角色
 * 3. 抽象同事类：定义同事类的接口，保存中介者对象，提供同事对象交互的抽象方法，实现所有相互影响的同事类的公共功能
 * 4. 具体同事类：是抽象同事类的实现，当需要与其他同事对象进行交互时，由中介者对象负责后续的交互
 */

/**
 * 定义抽象中介接口
 */
abstract class AbstractMediator {
    abstract sendMessage(sender: Colleague, message: string): void
}

/**
 * 定义抽象同事类
 */
abstract class Colleague {
    protected constructor(public name: string, public mediator: AbstractMediator) {}
    send(message: string) {
        this.mediator.sendMessage(this, message)
    }
}

/**
 * 定义具体中介
 */
class ChatRoomMediator extends AbstractMediator {
    users: User[] = []
    addUser(user: User) {
        this.users.push(user)
    }
    sendMessage(sender: Colleague, message: string) {
        for (let user of this.users) {
            user !== sender && user.receiveMessage(sender, message)
        }
    }
}

class User extends Colleague {
    constructor(public name: string, mediator: AbstractMediator) {
        super(name, mediator);
    }
    receiveMessage(sender: Colleague, message: string) {
        console.log(`${this.name} received a message from ${sender.name}: ${message}`)
    }
}

const chatRoomMediator: ChatRoomMediator = new ChatRoomMediator();
const user1 = new User("user 1", chatRoomMediator);
const user2 = new User("user 2", chatRoomMediator);
const user3 = new User("user 3", chatRoomMediator);

chatRoomMediator.addUser(user1);
chatRoomMediator.addUser(user2);
chatRoomMediator.addUser(user3);

user1.send("hello, I am user 1");
user2.send("hello, I am user 2");
user3.send("hello, I am user 3");