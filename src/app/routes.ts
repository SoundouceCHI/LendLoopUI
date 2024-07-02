import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";
import { LoginComponent } from "./login/login.component";
import { UserItemComponent } from "./user-item/user-item.component";
import { AddItemComponent } from "./add-item/add-item.component";
import { BookingComponent } from "./booking/booking.component";
import { AuthGuard } from './services/authGard';

const routeConfig : Routes= [
    {
        path: '', 
        component: HomeComponent, 
        title: 'Home page'
    }, 
    {
        path: "details/:id", 
        component: DetailsComponent, 
        title: "Details page"
    }, 
    {
        path: "login", 
        component: LoginComponent, 
        title: "Login"
    }, 
    {
        path:"member/:id/items", 
        component: UserItemComponent, 
        title: "Items"
    }, 
    {
        path: "addItem/:id",
        component: AddItemComponent, 
        title: "New Item" 
    }, 
    {
        path:"booking/:id", 
        component: BookingComponent, 
        title: "booking",
        canActivate: [AuthGuard] 
    }
]; 

export default routeConfig; 