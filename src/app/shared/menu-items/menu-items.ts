import {Injectable} from '@angular/core';

export interface BadgeItem {
  type: string;
  value: string;
}

export interface ChildrenItems {
  state: string;
  target?: boolean;
  name: string;
  type?: string;
  children?: ChildrenItems[];
}

export interface MainMenuItems {
  state: string;
  short_label?: string;
  main_state?: string;
  target?: boolean;
  name: string;
  type: string;
  icon: string;
  badge?: BadgeItem[];
  children?: ChildrenItems[];
}

export interface Menu {
  label: string;
  main: MainMenuItems[];
}

const MENUITEMS = [
  {
   label: '',
    main: [
      {
        state: 'dashboard',
        short_label: 'R',
        name: 'Reporting',
        type: 'sub',
        icon: 'icon-file',
        children: [
          {
            state: 'sales',
            name: 'Sales',
            type: 'sub',
            children: [
              {
                state: 'custom',
                name: 'Custom Reports',
              },
              ]
          },
          {
            state: '',
            name: 'Inventory'
          },
          {
            state: '',
            name: 'Employees',
            // badge: [
            //   {
            //     type: 'info',
            //     value: 'NEW'
            //   }
            // ]
          }
        ]
      },
      {
        state: 'forms',
        short_label: 'I',
        name: 'Product',
        type: 'sub',
        icon: 'icon-layout-list-post',
        children: [
          {
            state: 'add-on',
            name: 'Products'
          },
          {
            state: 'modifiers',
            name: 'Modifiers'
          },
          {
            state: 'new-group',
            name: 'create group'
          },
          {
            state: 'quick-item',
            name: 'quick add item'
          },
          {
            state: 'default',
            name: 'Departments'
          },
          {
            state: 'default',
            name: 'Bulk items',

          },
          {
            state: 'default',
            name: 'Combos'
          },
          {
            state: 'default',
            name: 'Mix and Match'
          },
          {
            state: 'default',
            name: 'Touch Screen Designer'
          },
          // {
          //   state: 'default',
          //   name: 'Customers'
          // },
        ]
      },
      {
        state: 'employee',
        short_label: 'E',
        name: 'Employees',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'list',
            name: 'New Employee'
          },
        ]
      },
     
      {
        state: 'access-control',
        short_label: 'E',
        name: 'Access Control',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'list',
            name: 'Access Level'
          },
        ]
      },
      {
        state: 'customer',
        short_label: 'C',
        name: 'Customers',
        type: 'link',
        icon: 'icon-user',
        // children: [
        //   {
        //     state: 'default',
        //     name: 'New Cus'
        //   },
        // ]
      },
      {
        state: 'store',
        short_label: 'S',
        name: 'Stores',
        type: 'link',
        icon: 'icon-layout-list-post',
      },
      {
        state: 'terminal',
        short_label: 'S',
        name: 'Terminal',
        type: 'link',
        icon: 'icon-layout-list-post',
      },
      {
        state: 'dashboard',
        short_label: 'S',
        name: 'Settings',
        type: 'sub',
        icon: 'icon-settings',
        children: [
                    {
                      state: 'default',
                      type: 'sub',
                      name: 'Hardware',
                      children: [
                        {
                          state: 'simple',
                          name: 'Printers',
                          //target: true
                        }, {
                          state: 'header-footer',
                          name: 'Scanner',
                         // target: true
                        },
                         {
                          state: 'social',
                          name: 'Customer Display',                         
                         // target: true
                        }, 
                        {
                          state: 'social-header-footer',
                          name: 'KDS',
                         // target: true
                        }
                      ]
                    },
          {
            state: 'default',
            name: 'Stations',
          },
          {
            state: 'default',
            name: 'Store Setting',
          }
        ]
      },
      {
        state: 'dashboard',
        short_label: 'O',
        name: 'Online Store',
        type: 'link',
        icon: 'icon-home',
      },
      {
        state: 'dashboard',
        short_label: 'A',
        name: 'Administration',
        type: 'sub',
        icon: 'icon-user',
        children: [
          {
            state: 'default',
            name: 'Vendors'
          },
         ]
       },
      
    ],
  },
  
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
}
