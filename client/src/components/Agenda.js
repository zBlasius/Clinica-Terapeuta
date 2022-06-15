import React, { Component } from "react";
import { Button } from "@react-md/button";
import moment from "moment";
import api from "../api/api";
import { ReactAgenda, ReactAgendaCtrl, guid, Modal } from "react-agenda";
import PatientModal from "./modals/PatientModal";
import { NativeSelect } from "@react-md/form";
require("moment/locale/pt-br.js");

const NOW = new Date();
const COLORS = {
  "color-1": "rgba(102, 195, 131 , 1)",
  "color-2": "rgba(242, 177, 52, 1)",
  "color-3": "rgba(235, 85, 59, 1)",
  "color-4": "rgba(70, 159, 213, 1)",
  "color-5": "rgba(170, 59, 123, 1)",
};

const items = [
  {
    id: guid(),
    name: "Conference , plaza",
    startDateTime: "2022-06-15T16:30:00.000Z",
    endDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 1,
      14,
      30
    ),
    classes: "color-4",
  },
  {
    id: "event-6",
    name: "Fun Day !",
    startDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 7,
      9,
      14
    ),
    endDateTime: new Date(
      NOW.getFullYear(),
      NOW.getMonth(),
      NOW.getDate() + 7,
      17
    ),
    classes: "color-3",
  },
];

export default class Agenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      selected: [],
      cellHeight: 60 / 4,
      showModal: false,
      showPatientModal: false,
      locale: "pt-br",
      rowsPerHour: 4,
      numberOfDays: 4,
      startDate: new Date(),
      patients: [],
      selectedPatientId: "",
    };
    this.handleRangeSelection = this.handleRangeSelection.bind(this);
    this.handleItemEdit = this.handleItemEdit.bind(this);
    this._openModal = this._openModal.bind(this);
    this._closeModal = this._closeModal.bind(this);
    this._openPatientModal = this._openPatientModal.bind(this);
    this._closePatientModal = this._closePatientModal.bind(this);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.changeView = this.changeView.bind(this);
    this.handleCellSelection = this.handleCellSelection.bind(this);
    this.refreshPatients = this.refreshPatients.bind(this);
  }

  // TODO: ASSOCIAR PACIENTE COM AGENDAMENTOS -> selectedPatientId

  componentDidMount() {
    this.refreshAppointments();
    this.refreshPatients();
  }

  refreshPatients() {
    //FIXME: getPatients
    api.get('get_all', { params: { user: this.props.user?.email, kind: 'Patient' } })
      .then(res => {
        this.setState({ patients: res.data });
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  componentWillReceiveProps(next, last) {
    if (next.items) {
      this.setState({ items: next.items });
    }
  }

  refreshAppointments() {
    api.get('get_all', { params: { user: this.props.user?.email, kind: 'Agendamentos' } })
      .then(res => {
        let _listAppointments = res.data;
        const listAppointments = _listAppointments.map(schedule => {
          return {
            ...schedule,
            startDateTime: new Date(schedule.startDateTime),
            endDateTime: new Date(schedule.endDateTime)
          }
        })
        this.setState({ items: listAppointments });
      })
      .catch(err => {
        console.log('err', err)
      })
  }

  handleItemEdit(item, openModal) {
    if (item && openModal === true) {
      this.setState({ selected: [item] });
      return this._openModal();
    }
  }

  handleCellSelection(item, openModal) {
    if (this.state.selected && this.state.selected[0] === item) {
      return this._openModal();
    }
    this.setState({ selected: [item] });
  }

  handleDateRangeChange(startDate, endDate) {
    this.setState({ startDate: startDate });
  }

  handleRangeSelection(selected) {
    this.setState({ selected: selected, showCtrl: true });
    this._openModal();
  }

  _openModal() {
    this.setState({ showModal: true });
  }

  _closeModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ selectedPatientId: "", showModal: false });
  }

  _openPatientModal() {
    this.setState({ showPatientModal: true });
  }

  _closePatientModal(e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    this.setState({ showPatientModal: false });
  }

  handleItemChange(items, item) {
    this.setState({ items: items });
  }

  handleItemSize(items, item) {
    this.setState({ items: items });
  }

  removeEvent(items, item) {
    console.log("item: ", item); // TODO: dar delete no banco

    this.setState({ items: items });
  }

  addNewEvent(items, item) {
    delete item._id;
    api.post("upcreate", { user: this.props?.user?.email, kind: "Agendamentos", params: item,})
      .then((resp) => {
        this.refreshAppointments();
      })
      .catch((err) => {
        alert("DEU ZIKA BOY");
      });
    this._closeModal();
  }

  editEvent(items, item) {
    console.log("item: ", item); 

    this.setState({ showModal: false, selected: [], items: items });
    this._closeModal();
  }

  changeView(days, event) {
    this.setState({ numberOfDays: days });
  }

  render() {
    return (
      <div className="content-expanded">
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="agenda-buttons">
            <Button
              theme="secondary"
              themeType="outline"
              style={{ margin: "0px 4px" }}
              onClick={this.changeView.bind(null, 7)}
            >
              {moment.duration(7, "days").humanize()}
            </Button>

            <Button
              theme="secondary"
              themeType="outline"
              style={{ margin: "0px 4px" }}
              onClick={this.changeView.bind(null, 4)}
            >
              {moment.duration(4, "days").humanize()}
            </Button>

            <Button
              theme="secondary"
              themeType="outline"
              style={{ margin: "0px 4px" }}
              onClick={this.changeView.bind(null, 3)}
            >
              {moment.duration(3, "days").humanize()}
            </Button>

            <Button
              theme="secondary"
              themeType="outline"
              style={{ margin: "0px 4px" }}
              onClick={this.changeView.bind(null, 1)}
            >
              {moment.duration(1, "day").humanize()}
            </Button>
          </div>

          <div className="pacient-buttons">
            <Button
              theme="secondary"
              themeType="outline"
              style={{ margin: "0px 4px" }}
              onClick={this._openPatientModal}
            >
              Pacientes
            </Button>
          </div>
        </div>

        <ReactAgenda
          minDate={new Date(NOW.getFullYear(), NOW.getMonth() - 3)}
          maxDate={new Date(NOW.getFullYear(), NOW.getMonth() + 3)}
          startDate={this.state.startDate}
          startAtTime={8}
          endAtTime={23}
          cellHeight={this.state.cellHeight}
          locale="pt-br"
          items={this.state.items}
          numberOfDays={this.state.numberOfDays}
          headFormat={"ddd DD MMM"}
          rowsPerHour={this.state.rowsPerHour}
          itemColors={COLORS}
          helper={true}
          view="calendar"
          autoScale={false}
          fixedHeader={true}
          onRangeSelection={this.handleRangeSelection.bind(this)}
          onChangeEvent={this.handleItemChange.bind(this)}
          onChangeDuration={this.handleItemSize.bind(this)}
          onItemEdit={this.handleItemEdit.bind(this)}
          onCellSelect={this.handleCellSelection.bind(this)}
          onItemRemove={this.removeEvent.bind(this)}
          onDateRangeChange={this.handleDateRangeChange.bind(this)}
        />

        {this.state.showModal && (
          <Modal clickOutside={this._closeModal}>
            <div className="modal-content">
              <NativeSelect
                id="simple-native-select"
                name="select"
                label="Pacientes"
                value={this.state.selectedPatientId}
                onChange={(event) =>
                  this.setState({
                    selectedPatientId: event.currentTarget.value,
                  })
                }
              >
                <option value="" disabled hidden />
                {this.state.patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </NativeSelect>
              <ReactAgendaCtrl
                items={this.state.items}
                itemColors={COLORS}
                selectedCells={this.state.selected}
                Addnew={this.addNewEvent}
                edit={this.editEvent}
              />
            </div>
          </Modal>
        )}

        <PatientModal
          user={this.props.user}
          show={this.state.showPatientModal}
          onRequestClose={this._closePatientModal}
          patients={this.state.patients}
          refreshPatients={this.refreshPatients}
        />
      </div>
    );
  }
}
