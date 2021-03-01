import React from 'react';
import taskForm from '../../images/ss5.png';
import submitTask from '../../images/ss3.png';
import details from '../../images/ss8.png';
import assignTask from '../../images/ss11.png';
import menu from '../../images/ss12.png';
import changePIN from '../../images/ss13.png';
import admin from '../../images/ss14.png';
import search from '../../images/ss2.png';

const About = () => {
    return (
        <div className='container'>
            <h2>Welcome to Work Tracker</h2>
            <h5 className='blue-text'>Keep track of your project's dependencies!!</h5>
            <br></br>
            <h5><strong>Features:-</strong></h5>
            <ol>
                <li><a href='#first'>Add a Task</a></li>
                <li><a href='#second'>Submitted Tasks</a></li>
                <li><a href='#third'>Assigned Tasks</a></li>
                <li><a href='#fourth'>SearchBar and Sort</a></li>
                <li><a href='#fifth'>Menu button</a></li>
                <li><a href='#sixth'>Change PIN</a></li>
                <li><a href='#seventh'>Admin Features</a></li>
            </ol>
            <ul>
                <li id='first'>
                    <h6><strong>1. Add a task</strong></h6>
                    <p>It doesn't matter if it's an error or a modifying an existing module... just assign a task to you teammate mentioning the type of the task, urgency and details</p>
                    <img src={taskForm} alt='' style={{width:'75%'}} />
                </li>
                <li id='second'>
                    <h6><strong>2. Submitted Task</strong></h6>
                    <p>The tasks submitted by you are displayed in a different column. Each card is shown in a card which contains all the information about the task and basic functionalities like
                        <ol>
                            <li>
                                Deleting the task
                            </li>
                            <li>
                                Change the status of the Task
                            </li>
                            <li>
                                Re-Assign task to other Team-Member
                            </li>
                        </ol>
                    </p>
                    <img src={submitTask} alt='' style={{width:'50%'}} /><img src={details} alt='' style={{width:'50%'}} />
                </li>
                <li id='third'>
                    <h6><strong>3. Assigned task</strong></h6>
                    <p>The task assigned to you by your teammates will de displayed in a different column. The cards have similar features just some different functionalities like </p>
                    <ol>
                            <li>
                                Submitter's name is shown on the card.
                            </li>
                            <li>
                                You can't directly delete an assigned task from your side. Once you click on delete, an alert will be displayed on the top of the card, which will be a kind of request sent to the submitter to delete the task from their side.
                            </li>
                            <li>
                                You also can't directly re-assign an assigned task. Once you choose the user you want to re-assign to, an alert will be displayed on the top of the card, which will be a kind of request sent to the submitter to re-assign the task from their side.
                            </li>
                            <li>
                                You can change the Status of the task.
                            </li>
                        </ol>
                    <img src={assignTask} alt='' style={{width:'75%'}} />
                </li>
                <li id='fourth'>
                    <h6><strong>4. Search Bar and Sort</strong></h6>
                    <p>Once you login, the navbar becomes a Search Bar where you can search the tasks submitted by you or to you based on:</p>
                    <ol>
                            <li>
                                Task Title
                            </li>
                            <li>
                                Task description
                            </li>
                            <li>
                                Users
                            </li>
                            <li>
                                Priority of the tasks
                            </li>
                            <li>
                                Status of the tasks
                            </li>
                        </ol>
                    <p>whenever you login, the tasks are always sorted from Oldest to Latest, so that you focus on completing the old tasks first. But if you wish to sort the tasks then you can always:</p>
                    <ol>
                        <li>
                            <strong>sort by Latest:</strong> If you wish to check the latest tasks
                        </li>
                        <li>
                            <strong>sort by Priority:</strong> If you wish to check the tasks priority wise
                        </li>
                    </ol><br/>
                    <img src={search} alt='' style={{width:'50%'}} />
                </li>
                <li id='fifth'>
                    <h6><strong>5. Menu button</strong></h6>
                    <p>The menu button is at the bottom-right side of the dashboard. Once you click on it you get options like </p>
                    <ol>
                            <li>
                                Logout.
                            </li>
                            <li>
                                Change your PIN.
                            </li>
                            <li>
                                <strong>Admin functionalities <span className='red-text'>( Only visible to Admin )</span></strong>
                            </li>
                        </ol>
                    <img src={menu} alt='' style={{width:'25%'}} />
                </li>
                <li id='sixth'>
                    <h6><strong>6. Change PIN</strong></h6>
                    <p>Change your login PIN. Once changed successfully, you can re-login with new PIN </p>
                    <img src={changePIN} alt='' style={{width:'25%'}} />
                </li>
                <li id='seventh'>
                    <h6><strong>7. Admin Features</strong></h6>
                    <p>If you are an Admin, an extra option will be visible for you under Menu. Once you click on that you can do tasks like</p>
                    <ol>
                        <li>
                            See the list of all the registered Users
                        </li>
                        <li>
                            Remove users including their data like submitted and assigned tasks.
                        </li>
                        <li>
                            As you are the Admin, only you can register users and give them access to the site
                        </li>
                    </ol>
                    <img src={admin} alt='' style={{width:'60%'}} />
                </li>
            </ul>
        </div>
    )
}

export default About;