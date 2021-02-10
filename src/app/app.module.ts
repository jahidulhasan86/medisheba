import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AppRoutingModule } from './/app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { NgxLinkifyjsModule } from 'ngx-linkifyjs';
import { FlexLayoutModule } from '@angular/flex-layout';

// Pipes
import { LinkifyPipe } from './shared/pipes/linkfy';
import {
	HasChatPipe,
	HasAudioPipe,
	HasVideoPipe,
	IsAutoPublishPipe,
	HasScreenSharingPipe,
	HasFullscreenPipe,
	HasLayoutSpeakingPipe,
	HasExitPipe
} from './shared/pipes/ovSettings.pipe';
import { TooltipListPipe } from './shared/pipes/tooltipList.pipe';

// Components
import { StreamComponent } from './shared/components/stream/stream.component';
import { ChatComponent } from './shared/components/chat/chat.component';
import { OpenViduVideoComponent } from './shared/components/stream/ov-video.component';
import { DialogErrorComponent } from './shared/components/dialog-error/dialog-error.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { ToolbarLogoComponent } from './shared/components/toolbar/logo.component';
import { RoomConfigComponent } from './shared/components/room-config/room-config.component';
import { WebComponentComponent } from './web-component/web-component.component';
import { VideoRoomComponent } from './video-room/video-room.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// Services
import { NetworkService } from './shared/services/network/network.service';
import { OpenViduSessionService } from './shared/services/openvidu-session/openvidu-session.service';
import { UtilsService } from './shared/services/utils/utils.service';
import { DevicesService } from './shared/services/devices/devices.service';
import { RemoteUsersService } from './shared/services/remote-users/remote-users.service';
// import { ChatService } from './shared/services/chat/chat.service';
import { LoggerService } from './shared/services/logger/logger.service';
import { NotificationService } from './shared/services/notifications/notification.service';
import { StorageService } from './shared/services/storage/storage.service';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AuthGuard } from './auth/auth.guard';
import { CookieService } from 'ngx-cookie-service';
import { DeviceDetectorService } from 'ngx-device-detector';
// import { GlobalServices } from './services/global_services';
// import { MessagingService } from './messaging.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { LayoutModule } from '@angular/cdk/layout';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';

import { HomeNavbarComponent } from './components/home-navbar/home-navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { LeftPanelComponent } from './components/left-panel/left-panel.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './core/components/main/main.component';
import { GeneralComponent } from './core/components/general/general.component';
import { SetupComponent } from './core/components/setup/setup.component';
import { RecentComponent } from './feature/recent/components/recent/recent.component';
import { DoctorsComponent } from './feature/doctor/components/doctors/doctors.component';
import { DoctorAppointmentsComponent } from './feature/doctor-appointment/components/doctor-appointments/doctor-appointments.component';
import { AppointmentsComponent } from './feature/patient-appointment/components/appointments/appointments.component';
import { AccountService } from './core/services/account/account.service';
import { SigninComponent } from './core/components/signin/signin.component';
import { MessagingService } from './core/services/messaging/messaging.service';
import { GlobalServices } from './core/services/global/global_services';
import { XmppChatService } from './shared/services/xmpp-chat/xmpp-chat.service';
import { ChatService } from './shared/services/chat/chat.service';


@NgModule({
	declarations: [
		AppComponent,
		VideoRoomComponent,
		HomeComponent,
		StreamComponent,
		ChatComponent,
		OpenViduVideoComponent,
		DialogErrorComponent,
		RoomConfigComponent,
		WebComponentComponent,
		ToolbarComponent,
		ToolbarLogoComponent,
		LinkifyPipe,
		HasChatPipe,
		HasAudioPipe,
		HasVideoPipe,
		IsAutoPublishPipe,
		HasScreenSharingPipe,
		HasFullscreenPipe,
		HasLayoutSpeakingPipe,
		HasExitPipe,
		TooltipListPipe,
		FooterComponent,

		HomeNavbarComponent,
		SigninComponent,
		HeaderComponent,
		LeftPanelComponent,
		NotFoundComponent,
		MainComponent,
		GeneralComponent,
		SetupComponent,
		RecentComponent,
		DoctorsComponent,
		DoctorAppointmentsComponent,
		AppointmentsComponent		
	],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		MatCardModule,
		MatToolbarModule,
		MatIconModule,
		MatInputModule,
		MatFormFieldModule,
		MatDialogModule,
		MatTooltipModule,
		MatBadgeModule,
		MatGridListModule,
		MatSelectModule,
		MatOptionModule,
		MatProgressSpinnerModule,
		MatSliderModule,
		MatSidenavModule,
		MatSnackBarModule,
		AppRoutingModule,
		HttpClientModule,
		FlexLayoutModule,
		NgxLinkifyjsModule.forRoot(),

		MatDatepickerModule,
		MatCheckboxModule,
		MatProgressBarModule,
		AngularFireDatabaseModule,
		AngularFireAuthModule,
		AngularFireMessagingModule,
		AngularFireModule.initializeApp(environment.firebase),

		MatAutocompleteModule,
		MatListModule,
		LayoutModule,
		FormsModule,
		MatMenuModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule,
		MatBadgeModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		MatTabsModule,
		MatSelectModule,
		MatRadioModule,
		MatGridListModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatNativeDateModule,
		MatSlideToggleModule,
		NgxMaterialTimepickerModule,
		NgxPaginationModule
		
	],
	entryComponents: [DialogErrorComponent, WebComponentComponent],
	providers: [
		NetworkService,
		OpenViduSessionService,
		UtilsService,
		RemoteUsersService,
		DevicesService,
		LoggerService,
		ChatService,
		NotificationService,
		StorageService,

		AuthGuard,
		CookieService,
		XmppChatService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor(private injector: Injector) {
		const strategyFactory = new ElementZoneStrategyFactory(WebComponentComponent, this.injector);
		const element = createCustomElement(WebComponentComponent, { injector: this.injector, strategyFactory });
		customElements.define('openvidu-webcomponent', element);
	}

	ngDoBootstrap() {}
}
