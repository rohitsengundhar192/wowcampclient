import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class JwtAuthService {
  return!: string;

  constructor(
    private route: ActivatedRoute,
    private jwtService: JwtHelperService
  ) {
    //vijayakumar sir
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIxIiwiY3VzdG9tZXJfaWQiOjkzLCJjb3VudHJ5X2NvZGUiOiJpbiIsImN1c3RvbWVyX3N1Yl9kb21haW5fbmFtZSI6ImdwdGNrbG0iLCJyZWdpc3RlcmVkX2VkdWNhdGlvbmFsX2luc3RpdHV0aW9uX25hbWUiOiJnb3Zlcm5tZW50IHBvbHl0ZWNobmljIGNvbGxlZ2UiLCJ0aW1lX3pvbmVfaWFuYV9zdHJpbmciOiJBc2lhL0tvbGthdGEiLCJhcHBfbmFtZSI6ImdwdGNrbG0iLCJkZWZhdWx0X2N1cnJlbmN5X3Nob3J0Zm9ybSI6IklOUiIsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjowLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi83Iiwic29ja2V0X2lkIjoiIiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiJNeXlwTzVKTEZkMkJSNU8sajBHVW1QaTRnM3dYNldUIiwidXNlcl9yZWdpc3RlcmVkX2NhdGVnb3JpZXNfaWRzIjoiZE51YTk2Sk1MejdRU3VvLDBvN0dLVDNXVDIxTlN4eiIsInVzZXJfcmVnaXN0cmF0aW9uX2xvZ2luX2FwcHJvdmFsX3N0YXR1cyI6MywiY291bnRyeSI6ImluIiwicGluX2NvZGUiOiI2MzUxMTMiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IktyaXNobmFnaXJpIiwiYWRkcmVzc19saW5lXzEiOiJrZWxhbWFuZ2FsYW0iLCJhZGRyZXNzX2xpbmVfMiI6ImtlbGFtYW5nYWxhbSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE2OTkzNDk3NDEsImV4cCI6MTg1OTM0OTc0MX0.cbIW2WVILs-AVV-2ck_7PZ1yE31jfA4gWsVRpMBFJFo'
    // );

    //rajasir
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI1IiwiY3VzdG9tZXJfaWQiOjkzLCJjb3VudHJ5X2NvZGUiOiJpbiIsImN1c3RvbWVyX3N1Yl9kb21haW5fbmFtZSI6ImdwdGNrbG0iLCJyZWdpc3RlcmVkX2VkdWNhdGlvbmFsX2luc3RpdHV0aW9uX25hbWUiOiJnb3Zlcm5tZW50IHBvbHl0ZWNobmljIGNvbGxlZ2UiLCJ0aW1lX3pvbmVfaWFuYV9zdHJpbmciOiJBc2lhL0tvbGthdGEiLCJhcHBfbmFtZSI6ImdwdGNrbG0iLCJkZWZhdWx0X2N1cnJlbmN5X3Nob3J0Zm9ybSI6IklOUiIsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjowLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi83Iiwic29ja2V0X2lkIjoiIiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiJNeXlwTzVKTEZkMkJSNU8sajBHVW1QaTRnM3dYNldUIiwidXNlcl9yZWdpc3RlcmVkX2NhdGVnb3JpZXNfaWRzIjoiamJCNEZXZ1NFTWVvcThhLGROdWE5NkpNTHo3UVN1byIsInVzZXJfcmVnaXN0cmF0aW9uX2xvZ2luX2FwcHJvdmFsX3N0YXR1cyI6MywiY291bnRyeSI6ImluIiwicGluX2NvZGUiOiI2MzUxMTMiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IktyaXNobmFnaXJpIiwiYWRkcmVzc19saW5lXzEiOiJrZWxhbWFuZ2FsYW0iLCJhZGRyZXNzX2xpbmVfMiI6ImtlbGFtYW5nYWxhbSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE2OTkzNDk2NzcsImV4cCI6MTg1OTM0OTY3N30.RtpB60LaneKgyQWJedab3NfkF9SAoTEOImeLfZBqK8A'
    // );

    //Mine
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiIxMyIsImN1c3RvbWVyX2lkIjo5MywiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJncHRja2xtIiwicmVnaXN0ZXJlZF9lZHVjYXRpb25hbF9pbnN0aXR1dGlvbl9uYW1lIjoiZ292ZXJubWVudCBwb2x5dGVjaG5pYyBjb2xsZWdlIiwidGltZV96b25lX2lhbmFfc3RyaW5nIjoiQXNpYS9Lb2xrYXRhIiwiYXBwX25hbWUiOiJncHRja2xtIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOiJJTlIiLCJhY2NvdW50aW5nX3N0YW5kYXJkc19pZCI6MCwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvNyIsInNvY2tldF9pZCI6IiIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoiTXl5cE81SkxGZDJCUjVPLGowR1VtUGk0ZzN3WDZXVCIsInVzZXJfcmVnaXN0ZXJlZF9jYXRlZ29yaWVzX2lkcyI6ImROdWE5NkpNTHo3UVN1byxaM0F3a0dXakxiUDBoUWUsbEJreEFDYTRkdU9wSVBmIiwidXNlcl9yZWdpc3RyYXRpb25fbG9naW5fYXBwcm92YWxfc3RhdHVzIjoxLCJjb3VudHJ5IjoiaW4iLCJwaW5fY29kZSI6IjYzNTExMyIsInN0YXRlX3Byb3ZpbmNlIjoiVGFtaWwgTmFkdSIsImNpdHlfZGlzdHJpY3RfY291bnR5IjoiS3Jpc2huYWdpcmkiLCJhZGRyZXNzX2xpbmVfMSI6ImtlbGFtYW5nYWxhbSIsImFkZHJlc3NfbGluZV8yIjoia2VsYW1hbmdhbGFtIiwiY3VzdG9tZXJfdHlwZSI6MH0sImlhdCI6MTY5OTUwNzM4MiwiZXhwIjoxODU5NTA3MzgyfQ.U8vcU2QeNJvLDy226N5QXRUmkAOhdXoNWuJufjlb3AE'
    // );

    // Customer 105

    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI1IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvQ2FsY3V0dGEiLCJhcHBfbmFtZSI6InZrIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOiJJTlIiLCJhY2NvdW50aW5nX3N0YW5kYXJkc19pZCI6bnVsbCwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvMTIiLCJzb2NrZXRfaWQiOiIiLCJ1c2VyX2NhdGVnb3J5X3R5cGUiOiI0IiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiI2cmNaZzFNYUVPTlZTUFoiLCJ1c2VyX3JlZ2lzdGVyZWRfY2F0ZWdvcmllc19pZHMiOiJ3M1lveEJKcFVIcFNDZHUiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjEsImNvdW50cnkiOiJpbiIsInBpbl9jb2RlIjoicnR5cnkiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IlRpcnVwYXR0dXIiLCJhZGRyZXNzX2xpbmVfMSI6IlZhbml5YW1iYWRpIiwiYWRkcmVzc19saW5lXzIiOiJWYW5peWFtYmFkaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDI1MjczNzEsImV4cCI6MTg2MjUyNzM3MX0.is-E8pzP4eSESYAFiS9sUSwTimWAwyg3VXgsBkEt5LE'
    // );

    // Customer 105 - testing - mine - userreg(1)

    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI1IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvQ2FsY3V0dGEiLCJhcHBfbmFtZSI6InZrIiwiZGVmYXVsdF9jdXJyZW5jeV9zaG9ydGZvcm0iOiJJTlIiLCJhY2NvdW50aW5nX3N0YW5kYXJkc19pZCI6bnVsbCwiaXNfZGVmYXVsdF9hY2FkZW1pY195ZWFyX2Zvcm1hdF9zcGFubmluZ190d29fY2FsZW5kYXJfeWVhcnMiOjEsImRlZmF1bHRfYWNhZGVtaWNfeWVhcl9zdGFydF9kYXRlX2FuZF9tb250aCI6IjYvMTIiLCJzb2NrZXRfaWQiOiIiLCJ1c2VyX2NhdGVnb3J5X3R5cGUiOiI0IiwiZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fY2F0ZWdvcnlfaWQiOiI2cmNaZzFNYUVPTlZTUFoiLCJ1c2VyX3JlZ2lzdGVyZWRfY2F0ZWdvcmllc19pZHMiOiJ3M1lveEJKcFVIcFNDZHUiLCJ1c2VyX3JlZ2lzdHJhdGlvbl9sb2dpbl9hcHByb3ZhbF9zdGF0dXMiOjEsImNvdW50cnkiOiJpbiIsInBpbl9jb2RlIjoicnR5cnkiLCJzdGF0ZV9wcm92aW5jZSI6IlRhbWlsIE5hZHUiLCJjaXR5X2Rpc3RyaWN0X2NvdW50eSI6IlRpcnVwYXR0dXIiLCJhZGRyZXNzX2xpbmVfMSI6IlZhbml5YW1iYWRpIiwiYWRkcmVzc19saW5lXzIiOiJWYW5peWFtYmFkaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDI1MjczNzEsImV4cCI6MTg2MjUyNzM3MX0.is-E8pzP4eSESYAFiS9sUSwTimWAwyg3VXgsBkEt5LE'
    // );

    // Customer 105 - testing - teacher -  vk - userreg(3)

    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI4IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvS29sa2F0YSIsImFwcF9uYW1lIjoidmsiLCJkZWZhdWx0X2N1cnJlbmN5X3Nob3J0Zm9ybSI6IklOUiIsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjowLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi82Iiwic29ja2V0X2lkIjoiIiwidXNlcl9jYXRlZ29yeV90eXBlIjoiNCwwLDMiLCJlZHVjYXRpb25hbF9pbnN0aXR1dGlvbl9jYXRlZ29yeV9pZCI6IjZyY1pnMU1hRU9OVlNQWiIsInVzZXJfcmVnaXN0ZXJlZF9jYXRlZ29yaWVzX2lkcyI6InczWW94QkpwVUhwU0NkdSxWU3ltc05PYXRwakZNWEQsNG5oa1E5QzMyZkRWeEhhIiwidXNlcl9yZWdpc3RyYXRpb25fbG9naW5fYXBwcm92YWxfc3RhdHVzIjoxLCJjb3VudHJ5IjoiaW4iLCJwaW5fY29kZSI6IjYzNTEwOSIsInN0YXRlX3Byb3ZpbmNlIjoiVGFtaWwgTmFkdSIsImNpdHlfZGlzdHJpY3RfY291bnR5IjoiSG9zdXIiLCJhZGRyZXNzX2xpbmVfMSI6ImtyaXNobmFnaXJpIiwiYWRkcmVzc19saW5lXzIiOiJrcmlzaG5hZ2lyaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDYwMDI3MjIsImV4cCI6MTg2NjAwMjcyMn0.w_s0mxJqaRGk0rmwJ3fT5YQKMRW_FuY9e_Cf5u8ExRE'
    // );

    // customer 105 - testing - parent - nk - userreg(3)
    // localStorage.setItem(
    //   'access_token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiI2IiwiY3VzdG9tZXJfaWQiOjEwNSwiY291bnRyeV9jb2RlIjoiaW4iLCJjdXN0b21lcl9zdWJfZG9tYWluX25hbWUiOiJ2ayIsInJlZ2lzdGVyZWRfZWR1Y2F0aW9uYWxfaW5zdGl0dXRpb25fbmFtZSI6ImN2aWNreSIsInRpbWVfem9uZV9pYW5hX3N0cmluZyI6IkFzaWEvS29sa2F0YSIsImFwcF9uYW1lIjoidmsiLCJkZWZhdWx0X2N1cnJlbmN5X3Nob3J0Zm9ybSI6IklOUiIsImFjY291bnRpbmdfc3RhbmRhcmRzX2lkIjowLCJpc19kZWZhdWx0X2FjYWRlbWljX3llYXJfZm9ybWF0X3NwYW5uaW5nX3R3b19jYWxlbmRhcl95ZWFycyI6MSwiZGVmYXVsdF9hY2FkZW1pY195ZWFyX3N0YXJ0X2RhdGVfYW5kX21vbnRoIjoiNi82Iiwic29ja2V0X2lkIjoiIiwidXNlcl9jYXRlZ29yeV90eXBlIjoiMCIsImVkdWNhdGlvbmFsX2luc3RpdHV0aW9uX2NhdGVnb3J5X2lkIjoiNnJjWmcxTWFFT05WU1BaIiwidXNlcl9yZWdpc3RlcmVkX2NhdGVnb3JpZXNfaWRzIjoiVlN5bXNOT2F0cGpGTVhEIiwidXNlcl9yZWdpc3RyYXRpb25fbG9naW5fYXBwcm92YWxfc3RhdHVzIjozLCJjb3VudHJ5IjoiaW4iLCJwaW5fY29kZSI6IjYzNTEwOSIsInN0YXRlX3Byb3ZpbmNlIjoiVGFtaWwgTmFkdSIsImNpdHlfZGlzdHJpY3RfY291bnR5IjoiSG9zdXIiLCJhZGRyZXNzX2xpbmVfMSI6ImtyaXNobmFnaXJpIiwiYWRkcmVzc19saW5lXzIiOiJrcmlzaG5hZ2lyaSIsImN1c3RvbWVyX3R5cGUiOjB9LCJpYXQiOjE3MDYwMDMxNDcsImV4cCI6MTg2NjAwMzE0N30.-Gt0iytq40s3SnTD2sK7UaUs7UNlPH7xXdVUWZkFYpk'
    // );

    this.route.queryParams.subscribe(
      (params) => (this.return = params['return'] || '/')
    );
  }

  getJwtToken() {
    let HTTP_OPTIONS = {
      headers: new HttpHeaders({
        // 'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: ('Bearer ' +
          localStorage.getItem('access_token')) as any,
      }),
    };

    return HTTP_OPTIONS;
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }
  decodeJwtToken(jwt_token: string) {
    return this.jwtService.decodeToken(jwt_token);
  }
}
