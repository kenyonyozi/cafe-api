import { Model } from 'mongoose';
import { Reservation as ReservationModel } from '../models/reservation';

class ReservationService {
    private reservation: Model<ReservationModel>;

    constructor(reservation: Model<ReservationModel>) {
        this.reservation = reservation;
    }

    public async createReservation(
        reservationData: any
    ): Promise<ReservationModel> {
        const reservation = new this.reservation(reservationData);
        return await reservation.save();
    }

    public async confirmReservation(
        id: string
    ): Promise<ReservationModel | null> {
        return await this.reservation.findByIdAndUpdate(
            id,
            { isActive: true },
            { new: true }
        );
    }
}

export default ReservationService;
