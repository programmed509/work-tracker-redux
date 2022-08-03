import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  deleteTask,
  updateTask,
  clearMessage,
} from "../../redux/actions/taskActions";
import M from "materialize-css/dist/js/materialize.min.js";
import Moment from "react-moment";
import { Collapsible, CollapsibleItem } from "react-materialize";
import PropTypes from "prop-types";

const TaskItem = ({
  task,
  name,
  deleteBool,
  users: { users },
  deleteTask,
  updateTask,
  clearMessage,
}) => {
  useEffect(() => {
    let elems = document.querySelectorAll(".tooltipped");
    M.Tooltip.init(elems, {});
  }, []);

  const [user, setUser] = useState();
  const [updatedTask, setTask] = useState({ id: task._id });

  const onDelete = () => {
    if (window.confirm(`The task will be removed from ${name} as well`)) {
      if (!deleteBool) {
        updatedTask.message = "Requested to Delete the task";
        updateTask(updatedTask);
        M.toast({ html: `Delete Request send to Submitter` });
      } else {
        deleteTask(task._id);
        M.toast({ html: "Task has been deleted" });
      }
    }
  };

  const updated = (e) => {
    if (e.target.name === "assigned") {
      setUser(users.filter((user) => user._id === e.target.value));
    }
    if (e.target.name === "status") {
      setTask({ ...updatedTask, id: task._id, status: e.target.value });
    }
  };

  const onChangeStatus = () => {
    updateTask(updatedTask);
    M.toast({ html: "Status changed" });
  };

  const onReAssign = () => {
    if (deleteBool) {
      updatedTask.assigned = user[0]._id;
      updateTask(updatedTask);
      M.toast({ html: `Task reassigned to ${user[0].name}` });
    } else {
      name = user[0].name;
      updatedTask.message = `Re-assign task to ${name}`;
      updateTask(updatedTask);
      M.toast({ html: `Request sent to Submitter` });
    }
  };

  const onClearMessage = () => {
    clearMessage(task._id);
  };

  return (
    <>
      <div className="card">
        <div className="card-content black-text">
          {task.message && (
            <a
              href="#"
              className="red white-text tooltipped"
              data-position="top"
              data-tooltip="Click to remove the Alert"
              style={{ padding: "0.2rem 0.2rem" }}
              onClick={onClearMessage}
            >
              <strong>Alert : </strong> {task.message}
            </a>
          )}
          <span className="card-title">
            {task.task}
            <a
              href="#!"
              className="material-icons right red-text"
              onClick={onDelete}
            >
              delete
            </a>
          </span>
          <p className="grey-text">
            <Moment format="DD-MM-YY, h:mm a">{task.date}</Moment>
          </p>
          <span>
            <div className="badge">
              {task.status === "Open" ? (
                <p style={{ color: "blue" }}>{task.status}</p>
              ) : task.status === "Pending" ? (
                <p style={{ color: "purple" }}>{task.status}</p>
              ) : task.status === "In-Progress" ? (
                <p style={{ color: "orange" }}>{task.status}</p>
              ) : task.status === "Resolved" ? (
                <p style={{ color: "green" }}>{task.status}</p>
              ) : task.status === "Cancelled" ? (
                <p style={{ color: "red" }}>{task.status}</p>
              ) : (
                <i className="bi bi-question-circle-fill" />
              )}
            </div>
          </span>
          <br />
          <span className="black-text">
            <strong>{name}</strong>
          </span>
          <br />
          <div style={{ display: "inline-block" }}>
            Type:{" "}
            {task.type === "Bug" ? (
              <i className="bi bi-bug-fill" style={{ color: "red" }} />
            ) : task.type === "Modify" ? (
              <i className="bi bi-wrench" style={{ color: "violet" }} />
            ) : task.type === "Add" ? (
              <i
                className="bi bi-plus-square-fill"
                style={{ color: "orange" }}
              />
            ) : task.type === "Task" ? (
              <i
                className="bi bi-check-square-fill"
                style={{ color: "blue" }}
              />
            ) : task.type === "Test" ? (
              <i
                className="bi bi-gear-wide-connected"
                style={{ color: "grey" }}
              />
            ) : (
              <i className="bi bi-question-circle-fill" />
            )}
          </div>
          &nbsp;&nbsp; Priority:{" "}
          <div style={{ display: "inline-block" }}>
            {task.priority === "1" ? (
              <i
                className="bi bi-exclamation-square-fill"
                style={{ color: "red" }}
              />
            ) : task.priority === "2" ? (
              <i
                className="bi bi-caret-up-square-fill"
                style={{ color: "orange" }}
              />
            ) : task.priority === "3" ? (
              <i
                className="bi bi-dash-square-fill"
                style={{ color: "green" }}
              />
            ) : task.priority === "4" ? (
              <i
                className="bi bi-caret-down-square-fill"
                style={{ color: "blue" }}
              />
            ) : (
              <i className="bi bi-question-circle-fill" />
            )}
          </div>
          <Collapsible accordion>
            <CollapsibleItem expanded={false} header="Description" node="div">
              {task.description === "" ? (
                <p>No description available</p>
              ) : (
                <p>{task.description}</p>
              )}
            </CollapsibleItem>
            <CollapsibleItem expanded={false} header="Actions" node="div">
              <div className="row">
                <div className="col m6">
                  <select
                    className="browser-default"
                    name="status"
                    onChange={updated}
                  >
                    <option defaultValue>Status</option>
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>{" "}
                  <br />
                  <button
                    className="btn blue"
                    name="status"
                    onClick={onChangeStatus}
                  >
                    Change
                  </button>
                  &nbsp;&nbsp;
                </div>
                <div className="col m6">
                  <select
                    className="browser-default"
                    name="assigned"
                    onChange={updated}
                  >
                    <option defaultValue>Users</option>
                    {users &&
                      users.map((user) => {
                        return (
                          <option key={user._id} value={user._id}>
                            {user.name}
                          </option>
                        );
                      })}
                  </select>{" "}
                  <br />
                  <button
                    className="btn blue"
                    name="assign"
                    onClick={onReAssign}
                  >
                    Re-Assign
                  </button>
                  &nbsp;&nbsp;
                </div>
              </div>
            </CollapsibleItem>
          </Collapsible>
        </div>
      </div>
      <br></br>
    </>
  );
};

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  deleteBool: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
  deleteTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
  clearMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users,
  tasks: state.tasks,
});

export default connect(mapStateToProps, {
  deleteTask,
  updateTask,
  clearMessage,
})(TaskItem);
